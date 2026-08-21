import { Component, signal } from "@angular/core";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
  Router,
} from "@angular/router";
import { AuthService } from "../../services/auth.service";

@Component({
  selector: "app-admin-layout",
  standalone: true,
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: "./admin-layout.component.html",
  styleUrl: "./admin-layout.component.css",
})
export class AdminLayoutComponent {
  readonly navLinks = [
    { path: "/admin/profile", label: "Profile", icon: "fa-solid fa-user" },
    {
      path: "/admin/social",
      label: "Social Links",
      icon: "fa-solid fa-share-nodes",
    },
    { path: "/admin/skills", label: "Skills", icon: "fa-solid fa-toolbox" },
    {
      path: "/admin/projects",
      label: "Projects",
      icon: "fa-solid fa-diagram-project",
    },
    {
      path: "/admin/education",
      label: "Education",
      icon: "fa-solid fa-graduation-cap",
    },
    {
      path: "/admin/experience",
      label: "Experience",
      icon: "fa-solid fa-briefcase",
    },
    {
      path: "/admin/cv",
      label: "CV / Resume",
      icon: "fa-regular fa-file-lines",
    },
  ];
  menuOpen = signal(false);
  constructor(
    readonly auth: AuthService,
    private router: Router,
  ) {}
  toggleMenu() {
    this.menuOpen.update((v) => !v);
  }
  closeMenu() {
    this.menuOpen.set(false);
  }
  logout() {
    this.auth.logout();
    this.router.navigate(["/admin/login"]);
  }
}
