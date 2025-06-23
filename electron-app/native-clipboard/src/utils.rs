use napi::bindgen_prelude::Error;
use napi::Status;
use arboard::Error as ArErr;

/// Convert an arboard error into a napi Error
pub fn map_err(op: &str, e: ArErr) -> Error {
    Error::new(
        Status::GenericFailure,
        format!("{} failed: {}", op, e),
    )
}
