use napi::bindgen_prelude::*;
use napi_derive::napi;
use arboard::{Clipboard, ImageData};
use crate::utils::map_err;
use base64::{engine::general_purpose, Engine as _};

#[napi]
/// Read the current clipboard image as a base64 PNG data URI (e.g. "data:image/png;base64,...")
pub fn read_image_data_uri() -> Result<String> {
    let mut ctx = Clipboard::new().map_err(|e| map_err("Clipboard::new", e))?;
    let image: ImageData<'_> = ctx.get_image().map_err(|e| map_err("get_image", e))?;
    let png_bytes = {
        let mut buf = Vec::new();
        {
            let encoder = png::Encoder::new(&mut buf, image.width as u32, image.height as u32);
            let mut writer = encoder.write_header().map_err(|e| {
                Error::new(Status::GenericFailure, format!("PNG header write failed: {}", e))
            })?;
            writer.write_image_data(image.bytes).map_err(|e| {
                Error::new(Status::GenericFailure, format!("PNG write failed: {}", e))
            })?;
        }
        buf
    };
    let b64 = general_purpose::STANDARD.encode(&png_bytes);
    Ok(format!("data:image/png;base64,{}", b64))
}

#[napi]
/// Write a base64-encoded PNG data URI into the clipboard.
pub fn write_image_data_uri(data_uri: String) -> Result<()> {
    // expect "data:image/png;base64,AAAA..."
    let parts: Vec<&str> = data_uri.split(',').collect();
    if parts.len() != 2 {
        return Err(Error::new(Status::InvalidArg, "Invalid data URI".to_string()));
    }
    let img_bytes = general_purpose::STANDARD
        .decode(parts[1])
        .map_err(|e| Error::new(Status::GenericFailure, format!("Base64 decode failed: {}", e)))?;
    // decode PNG
    let decoder = png::Decoder::new(&*img_bytes);
    let (info, mut reader) = decoder.read_info().map_err(|e| {
        Error::new(Status::GenericFailure, format!("PNG decode failed: {}", e))
    })?;
    let mut buf = vec![0; info.buffer_size()];
    reader.next_frame(&mut buf).map_err(|e| {
        Error::new(Status::GenericFailure, format!("PNG frame read failed: {}", e))
    })?;
    let image = arboard::ImageData {
        width: info.width as usize,
        height: info.height as usize,
        bytes: Cow::from(buf),
    };
    let mut ctx = Clipboard::new().map_err(|e| map_err("Clipboard::new", e))?;
    ctx.set_image(image).map_err(|e| map_err("set_image", e))?;
    Ok(())
}
