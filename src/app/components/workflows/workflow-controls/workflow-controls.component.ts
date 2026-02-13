import { Component, EventEmitter, Input, Output } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import {
  NodeFormComponent,
  NodeFormData,
} from "../node-form/node-form.component";
import {
  EdgeFormComponent,
  EdgeFormData,
  EdgeNode,
} from "../edge-form/edge-form.component";
import { WorkflowNode } from "../workflow.types";

@Component({
  selector: "app-workflow-controls",
  templateUrl: "./workflow-controls.component.html",
  styleUrls: ["./workflow-controls.component.css"],
  imports: [HlmButtonImports, NodeFormComponent, EdgeFormComponent],
})
export class WorkflowControlsComponent {
  // Node selection
  @Input() selectedNodeId: string | null = null;
  @Input() selectedNodeData: WorkflowNode | null = null;

  // Edge selection
  @Input() selectedEdgeId: string | null = null;
  @Input() selectedEdgeData: {
    label?: string;
    validation?: string | null;
    hidden?: boolean;
    source?: string;
    target?: string;
  } | null = null;
  @Input() availableNodes: EdgeNode[] = [];

  // Events
  @Output() nodeUpdate = new EventEmitter<NodeFormData>();
  @Output() nodeDelete = new EventEmitter<string>();
  @Output() edgeUpdate = new EventEmitter<EdgeFormData>();
  @Output() edgeDelete = new EventEmitter<string>();

  onNodeSave(data: NodeFormData): void {
    this.nodeUpdate.emit(data);
  }

  onNodeDelete(nodeId: string): void {
    this.nodeDelete.emit(nodeId);
  }

  onEdgeSave(data: EdgeFormData): void {
    this.edgeUpdate.emit(data);
  }

  onEdgeDelete(edgeId: string): void {
    this.edgeDelete.emit(edgeId);
  }
}
