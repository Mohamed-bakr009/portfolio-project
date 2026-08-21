import { Injectable, signal } from "@angular/core";

export type Theme = "light" | "dark";

@Injectable({ providedIn: "root" })
export class ThemeService {
  readonly theme = signal<Theme>("light");

  constructor() {
    const saved = localStorage.getItem("theme") as Theme | null;
    const systemPrefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    this.applyTheme(saved ?? (systemPrefersDark ? "dark" : "light"));
  }

  toggle(): void {
    this.applyTheme(this.theme() === "dark" ? "light" : "dark");
  }

  private applyTheme(theme: Theme): void {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
    this.theme.set(theme);
  }
}
