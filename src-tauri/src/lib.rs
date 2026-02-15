mod db;
mod models;

use models::{WorkflowDefinition, WorkflowEntry};
use sqlx::{Pool, Sqlite};
use tauri::{Manager, State};

#[tauri::command]
async fn save_workflow(
    state: State<'_, Pool<Sqlite>>,
    id: String,
    name: String,
    data: WorkflowDefinition,
) -> Result<(), String> {
    let data_json = serde_json::to_string(&data).map_err(|e| e.to_string())?;

    sqlx::query(
        "INSERT OR REPLACE INTO workflows (id, name, data, updated_at) VALUES (?, ?, ?, CURRENT_TIMESTAMP)",
    )
    .bind(id)
    .bind(name)
    .bind(data_json)
    .execute(&*state)
    .await
    .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
async fn get_workflows(state: State<'_, Pool<Sqlite>>) -> Result<Vec<WorkflowEntry>, String> {
    let workflows = sqlx::query_as::<_, WorkflowEntry>(
        "SELECT id, name, data, updated_at FROM workflows ORDER BY updated_at DESC"
    )
    .fetch_all(&*state)
    .await
    .map_err(|e| e.to_string())?;

    Ok(workflows)
}

#[tauri::command]
async fn get_workflow_by_id(
    state: State<'_, Pool<Sqlite>>,
    id: String,
) -> Result<Option<WorkflowEntry>, String> {
    let workflow = sqlx::query_as::<_, WorkflowEntry>(
        "SELECT id, name, data, updated_at FROM workflows WHERE id = ?"
    )
    .bind(id)
    .fetch_optional(&*state)
    .await
    .map_err(|e| e.to_string())?;

    Ok(workflow)
}

#[tauri::command]
async fn delete_workflow(state: State<'_, Pool<Sqlite>>, id: String) -> Result<(), String> {
    sqlx::query("DELETE FROM workflows WHERE id = ?")
        .bind(id)
        .execute(&*state)
        .await
        .map_err(|e| e.to_string())?;

    Ok(())
}

#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let handle = app.handle().clone();
            tauri::async_runtime::block_on(async move {
                let pool = db::init_db(&handle).await.expect("failed to init db");
                handle.manage(pool);
            });
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            greet,
            save_workflow,
            get_workflows,
            get_workflow_by_id,
            delete_workflow
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
