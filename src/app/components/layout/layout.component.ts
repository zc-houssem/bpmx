import { Component } from "@angular/core";
import { HeaderComponent } from "./header/header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: "app-layout",
  imports: [HeaderComponent, SidebarComponent],
  templateUrl: "./layout.component.html",
  styleUrl: "./layout.component.css",
})
export class LayoutComponent {}
