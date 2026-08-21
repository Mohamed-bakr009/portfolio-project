import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminExperienceService,
  ExperienceDoc,
} from "../../services/admin-experience.service";
const EMPTY: ExperienceDoc = {
  company: "",
  position: "",
  description: "",
  visible: true,
};
@Component({
  selector: "app-admin-experience",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-experience.component.html",
  styleUrl: "./admin-experience.component.css",
})
export class AdminExperienceComponent implements OnInit {
  entries = signal<ExperienceDoc[]>([]);
  newEntry = { ...EMPTY };
  message = signal("");
  constructor(private service: AdminExperienceService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service
      .getAll()
      .subscribe({
        next: (x) => this.entries.set(x),
        error: (e) =>
          this.message.set(e.error?.message || "Failed to load experience."),
      });
  }
  add() {
    if (!this.newEntry.company.trim() || !this.newEntry.position.trim()) return;
    this.service.create(this.newEntry).subscribe({
      next: () => {
        this.newEntry = { ...EMPTY };
        this.message.set("Experience added.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Add failed."),
    });
  }
  save(e: ExperienceDoc) {
    if (!e._id) return;
    this.service.update(e._id, e).subscribe({
      next: () => {
        this.message.set("Experience saved.");
        this.load();
      },
      error: (x) => this.message.set(x.error?.message || "Update failed."),
    });
  }
  toggle(e: ExperienceDoc) {
    if (!e._id) return;
    this.service
      .setVisibility(e._id, e.visible !== true)
      .subscribe({
        next: () => this.load(),
        error: (x) =>
          this.message.set(x.error?.message || "Visibility update failed."),
      });
  }
  remove(e: ExperienceDoc) {
    if (!e._id || !confirm(`Delete ${e.company} permanently?`)) return;
    this.service.delete(e._id).subscribe({
      next: () => {
        this.message.set("Experience deleted permanently.");
        this.load();
      },
      error: (x) => this.message.set(x.error?.message || "Delete failed."),
    });
  }
}
