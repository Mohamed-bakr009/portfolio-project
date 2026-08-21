import { Component, OnInit, signal } from "@angular/core";
import { RevealDirective } from "../../directives/reveal.directive";
import { Project, PortfolioExtra } from "../../models/portfolio.models";
import { ProjectsService } from "../../services/projects.service";
import { PortfolioContentService } from "../../services/portfolio-content.service";
@Component({
  selector: "app-projects",
  standalone: true,
  imports: [RevealDirective],
  templateUrl: "./projects.component.html",
  styleUrl: "./projects.component.css",
})
export class ProjectsComponent implements OnInit {
  readonly projects = signal<Project[]>([]);
  readonly extras = signal<PortfolioExtra[]>([]);
  constructor(
    private projectsService: ProjectsService,
    private content: PortfolioContentService,
  ) {}
  ngOnInit() {
    this.projectsService.getProjects().subscribe((x) => this.projects.set(x));
    this.content.getExtras().subscribe((x) => this.extras.set(x));
  }
}
