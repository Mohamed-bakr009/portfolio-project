import { Component, ElementRef, HostListener } from "@angular/core";

import { ThemeService } from "../../services/theme.service";
import { CvModalService } from "../../services/cv-modal.service";
import { ScrollSpyService } from "../../services/scroll-spy.service";
import { CvService } from "../../services/cv.service";
import { signal } from "@angular/core";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.css",
})
export class HeaderComponent {
  menuOpen = false;
  readonly cvAvailable = signal(false);

  readonly navLinks = [
    { href: "#home", label: "Home", id: "home" },
    { href: "#about", label: "About", id: "about" },
    { href: "#skills", label: "Skills", id: "skills" },
    { href: "#projects", label: "Projects", id: "projects" },
    { href: "#contact", label: "Contact", id: "contact" },
  ];

  constructor(
    private el: ElementRef<HTMLElement>,
    readonly theme: ThemeService,
    readonly cvModal: CvModalService,
    readonly scrollSpy: ScrollSpyService,
    private cvService: CvService,
  ) {
    this.cvService
      .getCv()
      .subscribe((cv) => this.cvAvailable.set(cv.available));
  }

  isActive(sectionId: string): boolean {
    return this.scrollSpy.activeSectionId() === sectionId;
  }

  toggleTheme(): void {
    this.theme.toggle();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
    document.body.style.overflow = this.menuOpen ? "hidden" : "";
  }

  closeMenu(): void {
    this.menuOpen = false;
    document.body.style.overflow = "";
  }

  openCv(): void {
    this.cvModal.open();
  }

  openCvFromMobile(): void {
    this.closeMenu();
    this.cvModal.open();
  }

  @HostListener("document:click", ["$event"])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as Node;
    // Clicking outside the open mobile drawer closes it too.
    const nav = this.el.nativeElement.querySelector(".nav-links");
    const menuBtn = this.el.nativeElement.querySelector(".menu-btn");
    if (
      this.menuOpen &&
      nav &&
      menuBtn &&
      !nav.contains(target) &&
      !menuBtn.contains(target)
    ) {
      this.closeMenu();
    }
  }

  @HostListener("window:resize")
  onResize(): void {
    if (window.innerWidth > 900) this.closeMenu();
  }
}
