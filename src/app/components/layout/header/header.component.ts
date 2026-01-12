import { Component, inject } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { LayoutService } from "../layout.service";
import { LucideAngularModule, Columns2 } from "lucide-angular";
import { ModeToggleComponent } from "../mode-toggle/mode-toggle.component";

@Component({
  selector: "app-header",
  imports: [HlmButtonImports, LucideAngularModule, ModeToggleComponent],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  readonly layoutService = inject(LayoutService);

  //icons
  Columns2 = Columns2;
}
