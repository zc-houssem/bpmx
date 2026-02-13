import { Component, inject } from "@angular/core";
import { LayoutService } from "../layout.service";
import { LucideAngularModule, Moon, Sun } from "lucide-angular";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-mode-toggle",
  imports: [CommonModule, LucideAngularModule],
  templateUrl: "./mode-toggle.component.html",
  styleUrl: "./mode-toggle.component.css",
})
export class ModeToggleComponent {
  readonly layoutService = inject(LayoutService);

  //icons
  Moon = Moon;
  Sun = Sun;
}
