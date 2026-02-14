import { Component, computed, input } from "@angular/core";
import {
  NgDiagramBaseEdgeComponent,
  NgDiagramBaseEdgeLabelComponent,
  Edge,
} from "ng-diagram";

interface WorkflowEdgeData {
  label?: string;
  validation?: string | null;
  hidden?: boolean;
}

@Component({
  selector: "app-labeled-edge",
  standalone: true,
  imports: [NgDiagramBaseEdgeComponent, NgDiagramBaseEdgeLabelComponent],
  templateUrl: "./labeled-edge.component.html",
  styleUrls: ["./labeled-edge.component.css"],
})
export class LabeledEdgeComponent {
  edge = input.required<Edge<WorkflowEdgeData>>();

  labelId = computed(() => `label-${this.edge().id}`);

  labelText = computed(() => {
    const data = this.edge().data;
    if (data?.hidden) return "";
    return data?.label || "";
  });
}
