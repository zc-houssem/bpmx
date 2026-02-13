import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";

const SIDEBAR_KEY = "layout.sidebar.visible";
const DARKMODE_KEY = "layout.darkmode";

@Injectable({
  providedIn: "root",
})
export class LayoutService {
  isSidebarVisible = new BehaviorSubject<boolean>(
    this.getBoolean(SIDEBAR_KEY, true)
  );

  darkMode = new BehaviorSubject<boolean>(this.getBoolean(DARKMODE_KEY, false));

  constructor() {
    this.applyDarkMode(this.darkMode.value);
  }

  toggleSidebar(): void {
    const value = !this.isSidebarVisible.value;
    this.isSidebarVisible.next(value);
    localStorage.setItem(SIDEBAR_KEY, String(value));
  }

  toggleDarkMode(): void {
    const value = !this.darkMode.value;
    this.darkMode.next(value);
    localStorage.setItem(DARKMODE_KEY, String(value));
    this.applyDarkMode(value);
  }

  private applyDarkMode(enabled: boolean): void {
    const html = document.documentElement;
    html.classList.toggle("dark", enabled);
    html.setAttribute("data-theme", enabled ? "dark" : "light");
  }

  private getBoolean(key: string, fallback: boolean): boolean {
    const value = localStorage.getItem(key);
    return value === null ? fallback : value === "true";
  }
}
