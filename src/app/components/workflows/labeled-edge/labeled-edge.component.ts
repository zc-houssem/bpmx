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
  template: `
    <ng-diagram-base-edge [edge]="edge()" targetArrowhead="arrowclosed">
      @if (labelText()) {
        <ng-diagram-base-edge-label [id]="labelId()" [positionOnEdge]="0.5">
          <div class="edge-label">
            {{ labelText() }}
          </div>
        </ng-diagram-base-edge-label>
      }
    </ng-diagram-base-edge>
  `,
  styles: [
    `
      .edge-label {
        background-color: var(--background, #fff);
        border: 1px solid var(--border, #e2e8f0);
        border-radius: 4px;
        padding: 2px 8px;
        font-size: 12px;
        font-weight: 500;
        color: var(--foreground, #1e293b);
        white-space: nowrap;
        box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
      }
    `,
  ],
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
