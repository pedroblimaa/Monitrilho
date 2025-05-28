use crate::services::monitor_service::MonitorService;

#[tauri::command]
pub async fn greet(_name: &str) -> Result<(), ()> {
    MonitorService::show_monitor_info().await;

    Ok(())
}
