import { Component, inject, ViewChild } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import {
  initializeModel,
  NgDiagramComponent,
  NgDiagramConfig,
  NgDiagramModelService,
  NgDiagramViewportService,
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
  readonly diagramModelService = inject(NgDiagramModelService);
  readonly viewPortService = inject(NgDiagramViewportService);

  @ViewChild(NgDiagramComponent)
  diagram!: NgDiagramComponent;

  counter: number = 1;
  selectedNode: string | null = null;

  model = initializeModel({
    nodes: [],
    edges: [],
  });

  config: NgDiagramConfig = {
    zoom: { max: 3 },
    edgeRouting: { defaultRouting: "bezier" },
  };

  centerView() {
    this.viewPortService.zoomToFit();
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
        data: { label: `Node ${this.counter}` },
      },
    ]);
    this.counter++;
  }
}
