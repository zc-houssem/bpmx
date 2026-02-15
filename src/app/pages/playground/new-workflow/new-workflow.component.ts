import { Component } from "@angular/core";
import { WorkflowEditorComponent } from "../../../components/workflows/workflow-editor.component";

@Component({
  selector: "app-new-workflow",
  imports: [WorkflowEditorComponent],
  templateUrl: "./new-workflow.component.html",
  styleUrls: ["./new-workflow.component.css"],
})
export class NewWorkflowComponent {}
