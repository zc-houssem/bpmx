import { Component, inject, ViewChild } from "@angular/core";
import {
  initializeModel,
  NgDiagramComponent,
  NgDiagramConfig,
  NgDiagramEdgeTemplateMap,
  NgDiagramModelService,
  NgDiagramViewportService,
  provideNgDiagram,
} from "ng-diagram";
import {
  NodeFormComponent,
  NodeFormData,
} from "./node-form/node-form.component";
import {
  EdgeFormComponent,
  EdgeFormData,
  EdgeNode,
} from "./edge-form/edge-form.component";
import {
  WorkflowConfig,
  WorkflowDefinition,
  WorkflowNode,
  WorkflowStep,
} from "./workflow.types";
import { HlmResizableImports } from "@spartan-ng/helm/resizable";
import { HlmAccordionImports } from "@spartan-ng/helm/accordion";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { LabeledEdgeComponent } from "./labeled-edge/labeled-edge.component";
import { FormBuilderComponent } from "../form-builder/form-builder.component";
import { getGlobalActionsFormObject } from "./global-actions/utils/global-actions.form-object";
import { BehaviorSubject } from "rxjs";
import { NgIcon, provideIcons } from "@ng-icons/core";
import {
  lucideChevronDown,
  lucideSettings,
  lucideLayoutGrid,
  lucideZap,
  lucideFileText,
} from "@ng-icons/lucide";
import { WorkflowDbService } from "./workflow-db.service";

@Component({
  selector: "app-workflow-editor",
  imports: [
    NgDiagramComponent,
    NodeFormComponent,
    EdgeFormComponent,
    FormBuilderComponent,
    HlmResizableImports,
    HlmAccordionImports,
    HlmButtonImports,
    NgIcon,
  ],
  providers: [
    provideNgDiagram(),
    provideIcons({
      lucideChevronDown,
      lucideSettings,
      lucideLayoutGrid,
      lucideFileText,
      lucideZap,
    }),
  ],
  templateUrl: "./workflow-editor.component.html",
  styleUrls: ["./workflow-editor.component.css"],
})
export class WorkflowEditorComponent {
  readonly diagramModelService = inject(NgDiagramModelService);
  readonly viewPortService = inject(NgDiagramViewportService);
  private readonly workflowDbService = inject(WorkflowDbService);

  @ViewChild(NgDiagramComponent)
  diagram!: NgDiagramComponent;

  // Edge template map for labeled edges
  edgeTemplateMap = new NgDiagramEdgeTemplateMap([
    ["default", LabeledEdgeComponent],
  ]);

  counter: number = 1;
  selectedNodeId: string | null = null;
  selectedNodeData: WorkflowNode | null = null;
  selectedEdgeId: string | null = null;
  selectedEdgeData: {
    label?: string;
    validation?: string | null;
    hidden?: boolean;
    source?: string;
    target?: string;
  } | null = null;

  // Global workflow configuration
  workflowConfig: WorkflowConfig = {
    flowTitle: "",
    schemaName: "",
  };

  // BehaviorSubjects for form values
  flowTitle$ = new BehaviorSubject<string>("");
  schemaName$ = new BehaviorSubject<string>("");

  globalActionsFormObject = getGlobalActionsFormObject({
    flowTitle$: this.flowTitle$,
    schemaName$: this.schemaName$,
    onFlowTitleChange: (value: string) => {
      this.flowTitle$.next(value);
      this.onConfigChange({
        flowTitle: value,
        schemaName: this.schemaName$.getValue(),
      });
    },
    onSchemaNameChange: (value: string) => {
      this.schemaName$.next(value);
      this.onConfigChange({
        flowTitle: this.flowTitle$.getValue(),
        schemaName: value,
      });
    },
  });

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
        data: {
          label: `Node ${this.counter}`,
          description: `This is a default description for the node ${this.counter}`,
          isUpdatable: true,
        },
      },
    ]);
    this.counter++;
  }

  onEdgeDrawn(event: { edge: any }) {
    // When a user draws an edge, update it with default type and data
    this.diagramModelService.updateEdge(event.edge.id, {
      type: "default",
      data: {
        label: "",
        validation: null,
        hidden: false,
      },
    });
  }

  onSelectionChanged(event: { selectedNodes: any[]; selectedEdges: any[] }) {
    // Handle node selection
    if (event.selectedNodes.length > 0) {
      const node = event.selectedNodes[0];
      this.selectedEdgeId = null;
      this.selectedEdgeData = null;
      this.selectedNodeId = node.id;
      this.selectedNodeData = (node.data as WorkflowNode) || null;
    }
    // Handle edge selection
    else if (event.selectedEdges.length > 0) {
      const edge = event.selectedEdges[0];
      this.selectedNodeId = null;
      this.selectedNodeData = null;
      this.selectedEdgeId = edge.id;
      const edgeData = edge.data as
        | { label?: string; validation?: string | null; hidden?: boolean }
        | undefined;
      this.selectedEdgeData = {
        label: edgeData?.label || "",
        validation: edgeData?.validation || null,
        hidden: edgeData?.hidden || false,
        source: edge.source,
        target: edge.target,
      };
    }
    // Nothing selected
    else {
      this.clearSelection();
    }
  }

  clearSelection() {
    this.selectedNodeId = null;
    this.selectedNodeData = null;
    this.selectedEdgeId = null;
    this.selectedEdgeData = null;
  }

  // Get all nodes as edge node options
  getAvailableNodes(): EdgeNode[] {
    const nodes = this.diagramModelService.nodes();
    return nodes.map((node: any) => ({
      id: node.id,
      label: (node.data as WorkflowNode)?.label || node.id,
    }));
  }

  // Node operations
  onNodeUpdate(data: NodeFormData) {
    this.diagramModelService.updateNode(data.nodeId, {
      data: data.data,
    });
    this.selectedNodeData = data.data;
  }

  onNodeDelete(nodeId: string) {
    this.diagramModelService.deleteNodes([nodeId]);
    this.clearSelection();
  }

  // Edge operations
  onEdgeUpdate(data: EdgeFormData) {
    this.diagramModelService.updateEdge(data.edgeId, {
      type: "default",
      data: {
        label: data.data.label,
        validation: data.data.validation,
        hidden: data.data.hidden,
      },
    });
    this.selectedEdgeData = {
      ...this.selectedEdgeData,
      label: data.data.label,
      validation: data.data.validation,
      hidden: data.data.hidden,
    };
  }

  onEdgeDelete(edgeId: string) {
    this.diagramModelService.deleteEdges([edgeId]);
    this.clearSelection();
  }

  // Global actions
  onConfigChange(config: WorkflowConfig) {
    this.workflowConfig = config;
    this.flowTitle$.next(config.flowTitle);
    this.schemaName$.next(config.schemaName);
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
            this.onImportWorkflow(workflow);
          } catch (e) {
            console.error("Failed to parse workflow JSON:", e);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  }

  onExportWorkflow() {
    const nodes = this.diagramModelService.nodes();
    const edges = this.diagramModelService.edges();

    // Build the workflow definition
    const steps: WorkflowStep[] = nodes.map((node: any) => {
      const nodeData = node.data as WorkflowNode;
      const nodeEdges = edges.filter((e: any) => e.source === node.id);

      return {
        id: node.id,
        name: nodeData.label,
        description: nodeData.description,
        isUpdatable: nodeData.isUpdatable,
        nextSteps: nodeEdges.map((edge: any) => {
          const data = edge.data as
            | { label?: string; validation?: string | null; hidden?: boolean }
            | undefined;
          return {
            label: data?.label || "",
            validation: data?.validation || null,
            nextStep: edge.target,
            hidden: data?.hidden || false,
          };
        }),
      };
    });

    const workflow: WorkflowDefinition = {
      "flow-title": this.workflowConfig.flowTitle,
      "schema-name": this.workflowConfig.schemaName,
      steps,
    };

    // Download as JSON
    const json = JSON.stringify(workflow, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${this.workflowConfig.schemaName || "workflow"}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }
  async onSaveToDatabase() {
    const nodes = this.diagramModelService.nodes();
    const edges = this.diagramModelService.edges();

    const steps: WorkflowStep[] = nodes.map((node: any) => {
      const nodeData = node.data as WorkflowNode;
      const nodeEdges = edges.filter((e: any) => e.source === node.id);

      return {
        id: node.id,
        name: nodeData.label,
        description: nodeData.description,
        isUpdatable: nodeData.isUpdatable,
        nextSteps: nodeEdges.map((edge: any) => {
          const data = edge.data as any;
          return {
            label: data?.label || "",
            validation: data?.validation || null,
            nextStep: edge.target,
            hidden: data?.hidden || false,
          };
        }),
      };
    });

    const workflow: WorkflowDefinition = {
      "flow-title": this.workflowConfig.flowTitle,
      "schema-name": this.workflowConfig.schemaName,
      steps,
    };

    const id = this.workflowConfig.schemaName || crypto.randomUUID();
    const name = this.workflowConfig.flowTitle || "Untitled Workflow";

    try {
      await this.workflowDbService.saveWorkflow(id, name, workflow);
      alert("Workflow saved to database successfully!");
    } catch (error) {
      alert("Failed to save workflow to database.");
    }
  }

  async onLoadFromDatabase() {
    try {
      const workflows = await this.workflowDbService.getWorkflows();
      if (workflows.length === 0) {
        alert("No workflows found in database.");
        return;
      }

      // Simple pick - for now just use the first one or ask
      const workflow = workflows[0];
      const definition = JSON.parse(workflow.data) as WorkflowDefinition;
      this.onImportWorkflow(definition);
      alert(`Loaded workflow: ${workflow.name}`);
    } catch (error) {
      alert("Failed to load workflows from database.");
    }
  }
  onImportWorkflow(workflow: WorkflowDefinition) {
    // Clear existing
    this.onClearWorkflow();

    // Set config
    this.workflowConfig = {
      flowTitle: workflow["flow-title"],
      schemaName: workflow["schema-name"],
    };

    // Create nodes
    const nodePositions: { [id: string]: { x: number; y: number } } = {};
    workflow.steps.forEach((step, index) => {
      const row = Math.floor(index / 3);
      const col = index % 3;
      nodePositions[step.id] = {
        x: 100 + col * 250,
        y: 100 + row * 200,
      };

      this.diagramModelService.addNodes([
        {
          id: step.id,
          position: nodePositions[step.id],
          data: {
            label: step.name,
            description: step.description,
            isUpdatable: step.isUpdatable,
          },
        },
      ]);
    });

    // Create edges
    workflow.steps.forEach((step) => {
      step.nextSteps.forEach((nextStep) => {
        if (nextStep.nextStep) {
          this.diagramModelService.addEdges([
            {
              id: crypto.randomUUID(),
              source: step.id,
              target: nextStep.nextStep,
              type: "default",
              data: {
                label: nextStep.label,
                validation: nextStep.validation,
                hidden: nextStep.hidden || false,
              },
            },
          ]);
        }
      });
    });

    this.counter = workflow.steps.length + 1;
  }

  onClearWorkflow() {
    const nodes = this.diagramModelService.nodes();
    const edges = this.diagramModelService.edges();
    this.diagramModelService.deleteNodes(nodes.map((n: any) => n.id));
    this.diagramModelService.deleteEdges(edges.map((e: any) => e.id));
    this.clearSelection();
    this.workflowConfig = { flowTitle: "", schemaName: "" };
    this.counter = 1;
  }
}
