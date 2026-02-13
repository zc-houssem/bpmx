// Workflow step/node definition
export interface WorkflowNode {
  label: string;
  description: string;
  isUpdatable: boolean;
}

// Edge/transition between workflow nodes
export interface WorkflowEdge {
  label: string;
  validation: string | null;
  nextStep: string;
  hidden?: boolean;
}

// Full workflow step definition (for export/import)
export interface WorkflowStep {
  id: string;
  name: string;
  description: string;
  isUpdatable: boolean;
  nextSteps: WorkflowEdge[];
}

// Global workflow configuration
export interface WorkflowConfig {
  flowTitle: string;
  schemaName: string;
}

// Complete workflow definition (for JSON export)
export interface WorkflowDefinition {
  "flow-title": string;
  "schema-name": string;
  steps: WorkflowStep[];
}
