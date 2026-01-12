import { Component, inject } from "@angular/core";
import { HlmButtonImports } from "@spartan-ng/helm/button";
import { LayoutService } from "../layout.service";
import { LucideAngularModule, Columns2 } from "lucide-angular";

@Component({
  selector: "app-header",
  imports: [HlmButtonImports, LucideAngularModule],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  readonly layoutService = inject(LayoutService);

  //icons
  Columns2 = Columns2;
}
