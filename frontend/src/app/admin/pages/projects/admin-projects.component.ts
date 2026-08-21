import { Component, OnInit, signal, computed } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminProjectsService,
  ProjectDoc,
} from "../../services/admin-projects.service";
import { toAssetUrl } from "../../../shared/asset-url";
interface Row extends ProjectDoc {
  technologiesText: string;
}
const EMPTY: Row = {
  title: "",
  description: "",
  category: "",
  technologies: [],
  technologiesText: "",
  githubUrl: "",
  liveUrl: "",
  visible: true,
};
@Component({
  selector: "app-admin-projects",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-projects.component.html",
  styleUrl: "./admin-projects.component.css",
})
export class AdminProjectsComponent implements OnInit {
  projects = signal<Row[]>([]);
  visibleCount = computed(
    () => this.projects().filter((x) => x.visible !== false).length,
  );
  allVisible = computed(
    () =>
      this.projects().length > 0 &&
      this.projects().every((x) => x.visible !== false),
  );
  newProject: Row = { ...EMPTY };
  newImageFile: File | null = null;
  newImagePreview = "";
  saving = signal(false);
  message = signal("");
  constructor(private service: AdminProjectsService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service
      .getAll()
      .subscribe({
        next: (x) =>
          this.projects.set(
            x.map((p) => ({
              ...p,
              technologiesText: (p.technologies || []).join(","),
            })),
          ),
        error: (e) =>
          this.message.set(e.error?.message || "Failed to load projects."),
      });
  }
  thumb(p: Row) {
    return toAssetUrl(p.image, "assets/project-dashboard.svg");
  }
  save(p: Row) {
    if (!p._id) return;
    const d: any = {
      title: p.title,
      description: p.description,
      category: p.category,
      githubUrl: p.githubUrl,
      liveUrl: p.liveUrl,
      visible: p.visible,
      technologies: p.technologiesText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
    };
    this.service.update(p._id, d).subscribe({
      next: () => {
        this.message.set("Project saved.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Update failed."),
    });
  }
  toggle(p: Row) {
    if (!p._id) return;
    this.service
      .setVisibility(p._id, p.visible !== true)
      .subscribe({
        next: () => this.load(),
        error: (e) =>
          this.message.set(e.error?.message || "Visibility update failed."),
      });
  }
  toggleAll() {
    const target = !this.allVisible();
    this.service.setAllVisibility(target).subscribe({
      next: () => {
        this.message.set(
          target ? "All projects shown." : "All projects hidden.",
        );
        this.load();
      },
      error: (e) =>
        this.message.set(
          e.error?.message || "Projects visibility update failed.",
        ),
    });
  }
  remove(p: Row) {
    if (!p._id || !confirm(`Delete ${p.title} permanently?`)) return;
    this.service.delete(p._id).subscribe({
      next: () => {
        this.message.set("Project deleted permanently.");
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Delete failed."),
    });
  }
  onNewImage(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    this.newImageFile = f;
    this.newImagePreview = URL.createObjectURL(f);
  }
  add() {
    if (!this.newProject.title.trim() || !this.newProject.description.trim())
      return;
    this.saving.set(true);
    const d: any = {
      title: this.newProject.title,
      description: this.newProject.description,
      category: this.newProject.category,
      technologies: this.newProject.technologiesText
        .split(",")
        .map((x) => x.trim())
        .filter(Boolean),
      githubUrl: this.newProject.githubUrl,
      liveUrl: this.newProject.liveUrl,
      visible: true,
    };
    this.service.create(d).subscribe({
      next: (p) => {
        if (this.newImageFile && p._id) {
          this.service.uploadImage(p._id, this.newImageFile).subscribe({
            next: () => this.finishAdd(),
            error: (e) => {
              this.message.set(e.error?.message || "Image upload failed.");
              this.saving.set(false);
            },
          });
        } else this.finishAdd();
      },
      error: (e) => {
        this.message.set(e.error?.message || "Add failed.");
        this.saving.set(false);
      },
    });
  }
  finishAdd() {
    this.newProject = { ...EMPTY };
    this.newImageFile = null;
    this.newImagePreview = "";
    this.saving.set(false);
    this.message.set("Project added.");
    this.load();
  }
  onImageSelected(e: Event, p: Row) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f || !p._id) return;
    this.service.uploadImage(p._id, f).subscribe({
      next: () => {
        this.message.set("Project image updated.");
        this.load();
      },
      error: (x) =>
        this.message.set(x.error?.message || "Image upload failed."),
    });
  }
}
