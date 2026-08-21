import { Injectable, signal } from "@angular/core";

@Injectable({ providedIn: "root" })
export class ScrollSpyService {
  readonly activeSectionId = signal<string>("home");
  private observer?: IntersectionObserver;

  start(): void {
    const sections = document.querySelectorAll("section[id]");
    if (!sections.length) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.activeSectionId.set(entry.target.id);
          }
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );

    sections.forEach((section) => this.observer!.observe(section));
  }

  stop(): void {
    this.observer?.disconnect();
  }
}
