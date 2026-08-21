import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminSkillsService,
  SkillDoc,
} from "../../services/admin-skills.service";
const EMPTY: SkillDoc = {
  name: "",
  category: "",
  icon: "",
  visible: true,
  showInTechStrip: false,
};
@Component({
  selector: "app-admin-skills",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-skills.component.html",
  styleUrl: "./admin-skills.component.css",
})
export class AdminSkillsComponent implements OnInit {
  skills = signal<SkillDoc[]>([]);
  newSkill: SkillDoc = { ...EMPTY };
  message = signal("");
  saving = signal(false);
  constructor(private service: AdminSkillsService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service
      .getAll()
      .subscribe({
        next: (x) => this.skills.set(x),
        error: (e) =>
          this.message.set(e.error?.message || "Failed to load skills."),
      });
  }
  add() {
    if (!this.newSkill.name.trim() || !this.newSkill.category.trim()) return;
    this.service.create(this.newSkill).subscribe({
      next: () => {
        this.newSkill = { ...EMPTY };
        this.message.set("Skill added.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Add failed."),
    });
  }
  save(s: SkillDoc) {
    if (!s._id) return;
    this.service.update(s._id, s).subscribe({
      next: () => {
        this.message.set("Skill saved.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Update failed."),
    });
  }
  toggleVisible(s: SkillDoc) {
    if (!s._id) return;
    this.service
      .setVisibility(s._id, s.visible !== true)
      .subscribe({
        next: () => this.load(),
        error: (e) =>
          this.message.set(e.error?.message || "Visibility update failed."),
      });
  }
  toggleTech(s: SkillDoc) {
    if (!s._id) return;
    this.service
      .setTechStrip(s._id, s.showInTechStrip !== true)
      .subscribe({
        next: () => this.load(),
        error: (e) =>
          this.message.set(e.error?.message || "Tech strip update failed."),
      });
  }
  remove(s: SkillDoc) {
    if (!s._id || !confirm(`Delete ${s.name} permanently?`)) return;
    this.service.delete(s._id).subscribe({
      next: () => {
        this.message.set("Skill deleted permanently.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Delete failed."),
    });
  }
}
