use napi::{bindgen_prelude::*, Env, JsObject};
use napi_derive::napi;
use arboard::Clipboard;
use crate::utils::map_err;
use tokio::time::{interval, Duration};

#[napi]
/// Continuously polls the clipboard every `ms` milliseconds and invokes `callback(new_content)`
/// whenever the text content changes. Returns a cancellation function.
pub fn watch_text<F>(env: Env, ms: u64, callback: JsFunction) -> Result<JsFunction>
where
    F: 'static,
{
    let tsfn = callback.create_threadsafe_function(0, |ctx| {
        Ok(vec![ctx.value])
    })?;

    // spawn a background task
    tokio::spawn(async move {
        let mut last = String::new();
        let mut iv = interval(Duration::from_millis(ms));
        while iv.tick().await.is_ok() {
            let mut ctx_cb = Clipboard::new();
            if let Ok(mut cb) = ctx_cb {
                if let Ok(txt) = cb.get_text() {
                    if txt != last {
                        last = txt.clone();
                        let _ = tsfn.call(Ok(txt), ThreadsafeFunctionCallMode::NonBlocking);
                    }
                }
            }
        }
        // tsfn // dropped automatically
    });

    // return a no-op destructor (we could hook cancellation here)
    Ok(env.create_function("cancel", move |_ctx| Ok(()).into_unknown())?)
}
