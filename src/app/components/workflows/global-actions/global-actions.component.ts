import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { FormBuilderComponent } from "../../form-builder/form-builder.component";
import { getGlobalActionsFormObject } from "./utils/global-actions.form-object";
import { WorkflowConfig, WorkflowDefinition } from "../workflow.types";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-global-actions",
  templateUrl: "./global-actions.component.html",
  styleUrls: ["./global-actions.component.css"],
  imports: [HlmButtonImports, FormBuilderComponent],
})
export class GlobalActionsComponent implements OnChanges {
  @Input() config: WorkflowConfig = { flowTitle: "", schemaName: "" };
  @Input() addNode: () => void = () => {
    console.warn("addNode not implemented");
  };
  @Input() centerView: () => void = () => {
    console.warn("centerView not implemented");
  };

  @Output() configChange = new EventEmitter<WorkflowConfig>();
  @Output() exportWorkflow = new EventEmitter<void>();
  @Output() importWorkflow = new EventEmitter<WorkflowDefinition>();
  @Output() clearWorkflow = new EventEmitter<void>();

  // BehaviorSubjects for form values
  flowTitle$ = new BehaviorSubject<string>("");
  schemaName$ = new BehaviorSubject<string>("");

  formObject = getGlobalActionsFormObject({
    flowTitle$: this.flowTitle$,
    schemaName$: this.schemaName$,
    onFlowTitleChange: (value: string) => {
      this.flowTitle$.next(value);
      this.emitConfigChange();
    },
    onSchemaNameChange: (value: string) => {
      this.schemaName$.next(value);
      this.emitConfigChange();
    },
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["config"] && this.config) {
      this.flowTitle$.next(this.config.flowTitle || "");
      this.schemaName$.next(this.config.schemaName || "");
    }
  }

  private emitConfigChange(): void {
    this.configChange.emit({
      flowTitle: this.flowTitle$.getValue(),
      schemaName: this.schemaName$.getValue(),
    });
  }

  onExport(): void {
    this.exportWorkflow.emit();
  }

  onImport(): void {
    // Trigger file input for import
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".json";
    input.onchange = (event: Event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
          try {
            const workflow = JSON.parse(
              reader.result as string,
            ) as WorkflowDefinition;
            this.importWorkflow.emit(workflow);
          } catch (e) {
            console.error("Failed to parse workflow JSON:", e);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  onClear(): void {
    this.clearWorkflow.emit();
  }
}
