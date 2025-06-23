use napi::bindgen_prelude::*;
use napi_derive::napi;
use arboard::{Clipboard, Error as ArboardError};

#[napi]
pub fn read_clipboard() -> Result<String> {
    let mut ctx = Clipboard::new().map_err(|e| {
        Error::new(Status::GenericFailure, format!("Clipboard init failed: {}", e))
    })?;
    let content = ctx.get_text().map_err(|e| {
        Error::new(Status::GenericFailure, format!("Read clipboard failed: {}", e))
    })?;
    Ok(content)
}

#[napi]
pub fn write_clipboard(text: String) -> Result<()> {
    let mut ctx = Clipboard::new().map_err(|e| {
        Error::new(Status::GenericFailure, format!("Clipboard init failed: {}", e))
    })?;
    ctx.set_text(text).map_err(|e| {
        Error::new(Status::GenericFailure, format!("Write clipboard failed: {}", e))
    })?;
    Ok(())
}
