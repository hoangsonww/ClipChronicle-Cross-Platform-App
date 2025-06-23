use napi::bindgen_prelude::*;
use napi_derive::napi;
use arboard::{Clipboard, Error as ArErr};
use crate::utils::map_err;

#[napi]
/// Return a list of available MIME-like formats currently on the clipboard.
pub fn list_formats() -> Result<Vec<String>> {
    let mut ctx = Clipboard::new().map_err(|e| map_err("Clipboard::new", e))?;
    let formats = ctx.get_formats().map_err(|e| map_err("get_formats", e))?;
    // formats is a Vec<FormatId>, map to human-readable
    let labels = formats.into_iter().map(|f| format!("{:?}", f)).collect();
    Ok(labels)
}

#[napi]
/// Clear all contents from the clipboard.
pub fn clear_clipboard() -> Result<()> {
    let mut ctx = Clipboard::new().map_err(|e| map_err("Clipboard::new", e))?;
    ctx.clear().map_err(|e| map_err("clear", e))?;
    Ok(())
}
