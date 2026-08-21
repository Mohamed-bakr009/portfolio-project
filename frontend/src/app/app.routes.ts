import { Routes } from "@angular/router";

import { authGuard } from "./admin/guards/auth.guard";

export const routes: Routes = [
  {
    path: "",
    loadComponent: () =>
      import("./pages/portfolio-page/portfolio-page.component").then(
        (m) => m.PortfolioPageComponent,
      ),
  },
  {
    path: "admin/login",
    loadComponent: () =>
      import("./admin/pages/login/admin-login.component").then(
        (m) => m.AdminLoginComponent,
      ),
  },
  {
    path: "admin",
    loadComponent: () =>
      import("./admin/pages/layout/admin-layout.component").then(
        (m) => m.AdminLayoutComponent,
      ),
    canActivate: [authGuard],
    children: [
      { path: "", redirectTo: "profile", pathMatch: "full" },
      {
        path: "profile",
        loadComponent: () =>
          import("./admin/pages/profile/admin-profile.component").then(
            (m) => m.AdminProfileComponent,
          ),
      },
      {
        path: "social",
        loadComponent: () =>
          import("./admin/pages/social/admin-social.component").then(
            (m) => m.AdminSocialComponent,
          ),
      },
      {
        path: "skills",
        loadComponent: () =>
          import("./admin/pages/skills/admin-skills.component").then(
            (m) => m.AdminSkillsComponent,
          ),
      },
      {
        path: "projects",
        loadComponent: () =>
          import("./admin/pages/projects/admin-projects.component").then(
            (m) => m.AdminProjectsComponent,
          ),
      },
      {
        path: "education",
        loadComponent: () =>
          import("./admin/pages/education/admin-education.component").then(
            (m) => m.AdminEducationComponent,
          ),
      },
      {
        path: "experience",
        loadComponent: () =>
          import("./admin/pages/experience/admin-experience.component").then(
            (m) => m.AdminExperienceComponent,
          ),
      },
      {
        path: "cv",
        loadComponent: () =>
          import("./admin/pages/cv/admin-cv.component").then(
            (m) => m.AdminCvComponent,
          ),
      },
    ],
  },
  { path: "**", redirectTo: "" },
];
