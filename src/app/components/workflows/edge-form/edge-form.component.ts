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
import { getEdgeFormObject } from "./utils/edge-form.form-object";
import { WorkflowEdge } from "../workflow.types";
import { BehaviorSubject } from "rxjs";
import { SelectOption } from "../../form-builder/form-builder.types";

export interface EdgeFormData {
  edgeId: string;
  data: WorkflowEdge;
}

export interface EdgeNode {
  id: string;
  label: string;
}

@Component({
  selector: "app-edge-form",
  templateUrl: "./edge-form.component.html",
  styleUrls: ["./edge-form.component.css"],
  imports: [HlmButtonImports, FormBuilderComponent],
})
export class EdgeFormComponent implements OnChanges {
  @Input() edgeId: string | null = null;
  @Input() edgeData: {
    label?: string;
    validation?: string | null;
    hidden?: boolean;
    source?: string;
    target?: string;
  } | null = null;
  @Input() availableNodes: EdgeNode[] = [];

  @Output() save = new EventEmitter<EdgeFormData>();
  @Output() delete = new EventEmitter<string>();

  // BehaviorSubjects for form values
  label$ = new BehaviorSubject<string>("");
  validation$ = new BehaviorSubject<string>("");
  hidden$ = new BehaviorSubject<boolean>(false);
  targetNode$ = new BehaviorSubject<SelectOption | undefined>(undefined);
  nodeOptions$ = new BehaviorSubject<SelectOption[]>([]);

  formObject = getEdgeFormObject({
    label$: this.label$,
    validation$: this.validation$,
    hidden$: this.hidden$,
    targetNode$: this.targetNode$,
    nodeOptions$: this.nodeOptions$,
    onLabelChange: (value: string) => this.label$.next(value),
    onValidationChange: (value: string) => this.validation$.next(value),
    onHiddenChange: (value: boolean) => this.hidden$.next(value),
    onTargetNodeChange: (value: SelectOption) => this.targetNode$.next(value),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["availableNodes"]) {
      const options = this.availableNodes.map((node) => ({
        name: node.label,
        code: node.id,
      }));
      this.nodeOptions$.next(options);
    }

    if (changes["edgeData"] && this.edgeData) {
      this.label$.next(this.edgeData.label || "");
      this.validation$.next(this.edgeData.validation || "");
      this.hidden$.next(this.edgeData.hidden ?? false);

      // Set target node if available
      if (this.edgeData.target) {
        const targetOption = this.nodeOptions$
          .getValue()
          .find((opt) => opt.code === this.edgeData?.target);
        this.targetNode$.next(targetOption);
      }
    }
  }

  onSave(): void {
    if (this.edgeId) {
      const targetNode = this.targetNode$.getValue();
      this.save.emit({
        edgeId: this.edgeId,
        data: {
          label: this.label$.getValue(),
          validation: this.validation$.getValue() || null,
          nextStep: (targetNode?.code as string) || "",
          hidden: this.hidden$.getValue(),
        },
      });
    }
  }

  onDelete(): void {
    if (this.edgeId) {
      this.delete.emit(this.edgeId);
    }
  }
}
