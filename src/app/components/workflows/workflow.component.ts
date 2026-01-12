import { Component, inject, ViewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import {
  NgDiagramComponent,
  NgDiagramConfig,
  NgDiagramModelService,
  NgDiagramService,
  initializeModel,
  provideNgDiagram,
} from "ng-diagram";

@Component({
  selector: "app-workflow",
  imports: [NgDiagramComponent, HlmButtonImports],
  providers: [provideNgDiagram()],
  templateUrl: "./workflow.component.html",
  styleUrl: "./workflow.component.css",
})
export class WorkflowComponent {
  private diagramModelService = inject(NgDiagramModelService);

  @ViewChild(NgDiagramComponent)
  diagram!: NgDiagramComponent;

  model = initializeModel({
    nodes: [],
    edges: [],
  });

  config: NgDiagramConfig = {
    zoom: { max: 3 },
    edgeRouting: { defaultRouting: "bezier" },
  };

  /* -----------------------------
   * Center / fit diagram
   * ----------------------------- */
  centerView() {
    // this.diagram?.zoomToFit();
  }

  addNode() {
    const id = crypto.randomUUID();
    this.diagramModelService.addNodes([
      {
        id,
        position: {
          x: 200 + Math.random() * 200,
          y: 200 + Math.random() * 200,
        },
        data: { label: `Node ${id}` },
      },
    ]);
  }
}
