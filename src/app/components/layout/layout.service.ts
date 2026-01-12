import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  isSidebarVisible: BehaviorSubject<boolean> = new BehaviorSubject(false);
  darkMode: BehaviorSubject<boolean> = new BehaviorSubject(false);
  constructor() {}

  toggleSidebar(): void {
    this.isSidebarVisible.next(!this.isSidebarVisible.value);
  }

  toggleDarkMode(): void {
    const html = document.getElementsByTagName("html")[0];
    if (this.darkMode.value) {
      html.classList.remove("dark");
      html.setAttribute("data-theme", "light");
    } else {
      html.classList.add("dark");
      html.setAttribute("data-theme", "dark");
    }
    this.darkMode.next(!this.darkMode.value);
  }
}
