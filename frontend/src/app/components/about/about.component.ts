import { Component, OnInit, signal } from "@angular/core";
import { RevealDirective } from "../../directives/reveal.directive";
import { ProfileService } from "../../services/profile.service";
import { ProjectsService } from "../../services/projects.service";
import { CvService } from "../../services/cv.service";
@Component({
  selector: "app-about",
  standalone: true,
  imports: [RevealDirective],
  templateUrl: "./about.component.html",
  styleUrl: "./about.component.css",
})
export class AboutComponent implements OnInit {
  profile = signal<any>(null);
  projectsCount = signal(0);
  trainingCount = signal(0);
  constructor(
    private p: ProfileService,
    private projects: ProjectsService,
    private cv: CvService,
  ) {}
  ngOnInit() {
    this.p.getProfile().subscribe((x) => this.profile.set(x));
    this.projects
      .getProjects()
      .subscribe((x) => this.projectsCount.set(x.length));
    this.cv.getCv().subscribe((x) => this.trainingCount.set(x.training.length));
  }
}
