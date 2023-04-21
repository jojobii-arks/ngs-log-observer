#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

use tauri::Manager;
use window_shadows::set_shadow;

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            let window = app.get_window("main").unwrap();
            set_shadow(&window, true).unwrap();
            Ok(())
        })
        .plugin(tauri_plugin_fs_watch::init())
        .plugin(tauri_plugin_fs_extra::init())
        .plugin(tauri_plugin_store::Builder::default().build())
        // rust-ignore
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
