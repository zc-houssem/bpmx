import { Routes } from "@angular/router";
import { WorkflowComponent } from "./components/workflows/workflow.component";
import { SavedWorkflowsComponent } from "./components/workflows/saved-workflows/saved-workflows.component";

export const routes: Routes = [
  { path: "new-flow", component: WorkflowComponent },
  { path: "saved-flows", component: SavedWorkflowsComponent },
];
