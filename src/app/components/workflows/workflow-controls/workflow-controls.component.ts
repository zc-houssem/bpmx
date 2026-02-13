import { Component, Input } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { FormBuilderComponent } from "../../form-builder/form-builder.component";
import { getWorkflowNodeFormObjectFactory } from "./utils/workflow-node.form-object";

@Component({
  selector: "app-workflow-controls",
  templateUrl: "./workflow-controls.component.html",
  styleUrls: ["./workflow-controls.component.css"],
  imports: [HlmButtonImports, FormBuilderComponent],
})
export class WorkflowControlsComponent {
  @Input() addNode: () => void = () => {
    console.warn("addNode not implemented");
  };
  @Input() centerView: () => void = () => {
    console.warn("centerView not implemented");
  };

  formObject = getWorkflowNodeFormObjectFactory({});
}
