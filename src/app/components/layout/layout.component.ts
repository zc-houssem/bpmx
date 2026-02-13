import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { HlmSidebarImports } from "@spartan-ng/helm/sidebar";
import { SiteHeaderComponent } from "./site-header/site-header.component";
import { SidebarComponent } from "./sidebar/sidebar.component";

@Component({
  selector: "app-layout",
  imports: [HlmSidebarImports, SiteHeaderComponent, SidebarComponent],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: "block [--header-height:--spacing(14)]",
  },
  styleUrl: "./layout.component.css",
  template: `
    <app-sidebar>
      <app-site-header header />
      <main hlmSidebarInset>
        <div class="flex flex-1 flex-col gap-4 p-4">
          <ng-content />
        </div>
      </main>
    </app-sidebar>
  `,
})
export default class LayoutComponent {}
