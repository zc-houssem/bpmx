import { Injectable } from "@angular/core";
import { invoke } from "@tauri-apps/api/core";
import { WorkflowDefinition } from "./workflow.types";

export interface WorkflowEntry {
  id: string;
  name: string;
  data: string;
  updated_at: string;
}

@Injectable({
  providedIn: "root",
})
export class WorkflowDbService {
  async saveWorkflow(
    id: string,
    name: string,
    data: WorkflowDefinition,
  ): Promise<void> {
    try {
      await invoke("save_workflow", { id, name, data });
    } catch (error) {
      console.error("Failed to save workflow:", error);
      throw error;
    }
  }

  async getWorkflows(): Promise<WorkflowEntry[]> {
    try {
      return await invoke<WorkflowEntry[]>("get_workflows");
    } catch (error) {
      console.error("Failed to get workflows:", error);
      throw error;
    }
  }

  async getWorkflowById(id: string): Promise<WorkflowEntry | null> {
    try {
      return await invoke<WorkflowEntry | null>("get_workflow_by_id", { id });
    } catch (error) {
      console.error("Failed to get workflow:", error);
      throw error;
    }
  }

  async deleteWorkflow(id: string): Promise<void> {
    try {
      await invoke("delete_workflow", { id });
    } catch (error) {
      console.error("Failed to delete workflow:", error);
      throw error;
    }
  }
}
