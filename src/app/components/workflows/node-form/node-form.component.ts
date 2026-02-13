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
import { getNodeFormObject } from "./utils/node-form.form-object";
import { WorkflowNode } from "../workflow.types";
import { BehaviorSubject } from "rxjs";

export interface NodeFormData {
  nodeId: string;
  data: WorkflowNode;
}

@Component({
  selector: "app-node-form",
  templateUrl: "./node-form.component.html",
  styleUrls: ["./node-form.component.css"],
  imports: [HlmButtonImports, FormBuilderComponent],
})
export class NodeFormComponent implements OnChanges {
  @Input() nodeId: string | null = null;
  @Input() nodeData: WorkflowNode | null = null;

  @Output() save = new EventEmitter<NodeFormData>();
  @Output() delete = new EventEmitter<string>();

  // BehaviorSubjects for form values
  label$ = new BehaviorSubject<string>("");
  description$ = new BehaviorSubject<string>("");
  isUpdatable$ = new BehaviorSubject<boolean>(true);

  formObject = getNodeFormObject({
    label$: this.label$,
    description$: this.description$,
    isUpdatable$: this.isUpdatable$,
    onLabelChange: (value: string) => this.label$.next(value),
    onDescriptionChange: (value: string) => this.description$.next(value),
    onIsUpdatableChange: (value: boolean) => this.isUpdatable$.next(value),
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["nodeData"] && this.nodeData) {
      this.label$.next(this.nodeData.label || "");
      this.description$.next(this.nodeData.description || "");
      this.isUpdatable$.next(this.nodeData.isUpdatable ?? true);
    }
  }

  onSave(): void {
    if (this.nodeId) {
      this.save.emit({
        nodeId: this.nodeId,
        data: {
          label: this.label$.getValue(),
          description: this.description$.getValue(),
          isUpdatable: this.isUpdatable$.getValue(),
        },
      });
    }
  }

  onDelete(): void {
    if (this.nodeId) {
      this.delete.emit(this.nodeId);
    }
  }
}
