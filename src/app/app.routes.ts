import { Routes } from "@angular/router";
import { WorkflowComponent } from "./components/workflows/workflow.component";
import { SavedWorkflowsComponent } from "./components/workflows/saved-workflows/saved-workflows.component";

export const routes: Routes = [
  {
    path: "playground",
    data: { breadcrumb: "Playground" },
    children: [
      {
        path: "new-workflow",
        component: WorkflowComponent,
        data: { breadcrumb: "New Workflow" },
      },
      {
        path: "saved-workflows",
        component: SavedWorkflowsComponent,
        data: { breadcrumb: "Saved Workflows" },
      },
      {
        path: "",
        redirectTo: "new-workflow",
        pathMatch: "full",
      },
    ],
  },
  {
    path: "",
    redirectTo: "playground/new-workflow",
    pathMatch: "full",
  },
];
