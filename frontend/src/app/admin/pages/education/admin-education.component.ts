import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminEducationService,
  EducationDoc,
} from "../../services/admin-education.service";
const EMPTY: EducationDoc = {
  institution: "",
  degree: "",
  field: "",
  visible: true,
};
@Component({
  selector: "app-admin-education",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-education.component.html",
  styleUrl: "./admin-education.component.css",
})
export class AdminEducationComponent implements OnInit {
  entries = signal<EducationDoc[]>([]);
  newEntry = { ...EMPTY };
  message = signal("");
  constructor(private service: AdminEducationService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service
      .getAll()
      .subscribe({
        next: (x) => this.entries.set(x),
        error: (e) =>
          this.message.set(e.error?.message || "Failed to load education."),
      });
  }
  add() {
    if (
      !this.newEntry.institution.trim() ||
      !this.newEntry.degree.trim() ||
      !this.newEntry.field.trim()
    )
      return;
    this.service.create(this.newEntry).subscribe({
      next: () => {
        this.newEntry = { ...EMPTY };
        this.message.set("Education added.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Add failed."),
    });
  }
  save(e: EducationDoc) {
    if (!e._id) return;
    this.service.update(e._id, e).subscribe({
      next: () => {
        this.message.set("Education saved.");
        this.load();
      },
      error: (x) => this.message.set(x.error?.message || "Update failed."),
    });
  }
  toggle(e: EducationDoc) {
    if (!e._id) return;
    this.service
      .setVisibility(e._id, e.visible !== true)
      .subscribe({
        next: () => this.load(),
        error: (x) =>
          this.message.set(x.error?.message || "Visibility update failed."),
      });
  }
  remove(e: EducationDoc) {
    if (!e._id || !confirm(`Delete ${e.institution} permanently?`)) return;
    this.service.delete(e._id).subscribe({
      next: () => {
        this.message.set("Education deleted permanently.");
        this.load();
      },
      error: (x) => this.message.set(x.error?.message || "Delete failed."),
    });
  }
}
