use serde::{Deserialize, Serialize};
use sqlx::FromRow;

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkflowNode {
    pub label: String,
    pub description: String,
    pub is_updatable: bool,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkflowEdge {
    pub label: String,
    pub validation: Option<String>,
    pub next_step: String,
    pub hidden: Option<bool>,
}

#[derive(Debug, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct WorkflowStep {
    pub id: String,
    pub name: String,
    pub description: String,
    pub is_updatable: bool,
    pub next_steps: Vec<WorkflowEdge>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct WorkflowDefinition {
    #[serde(rename = "flow-title")]
    pub flow_title: String,
    #[serde(rename = "schema-name")]
    pub schema_name: String,
    pub steps: Vec<WorkflowStep>,
}

#[derive(Debug, Serialize, Deserialize, FromRow)]
pub struct WorkflowEntry {
    pub id: String,
    pub name: String,
    pub data: String, // Stringified JSON
    pub updated_at: String,
}
