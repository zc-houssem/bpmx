import { Component, inject, Input } from "@angular/core";
import { LayoutService } from "../layout.service";
import { CommonModule } from "@angular/common";
import { LucideAngularModule, Save, Workflow } from "lucide-angular";
import { RouterModule } from "@angular/router";

@Component({
  selector: "app-sidebar",
  imports: [CommonModule, LucideAngularModule, RouterModule],
  templateUrl: "./sidebar.component.html",
  styleUrl: "./sidebar.component.css",
})
export class SidebarComponent {
  readonly layoutService = inject(LayoutService);

  sidebarObj = {
    header: {
      name: "BPMX",
      icon: Workflow,
    },
    items: [
      { name: "New Flow", icon: Workflow, route: ["/new-flow"] },
      { name: "Saved Flows", icon: Save, route: ["/saved-flows"] },
    ],
  };
}
