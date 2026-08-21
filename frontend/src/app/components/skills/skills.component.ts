import { Component, OnInit, signal } from "@angular/core";
import { RevealDirective } from "../../directives/reveal.directive";
import { SkillCategory } from "../../models/portfolio.models";
import { SkillsService } from "../../services/skills.service";

@Component({
  selector: "app-skills",
  standalone: true,
  imports: [RevealDirective],
  templateUrl: "./skills.component.html",
  styleUrl: "./skills.component.css",
})
export class SkillsComponent implements OnInit {
  readonly categories = signal<SkillCategory[]>([]);

  constructor(private skillsService: SkillsService) {}

  ngOnInit(): void {
    this.skillsService
      .getSkills()
      .subscribe((categories) => this.categories.set(categories));
  }
}
