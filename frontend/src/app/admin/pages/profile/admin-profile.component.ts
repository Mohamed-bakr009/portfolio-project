import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminProfileService,
  ProfileDoc,
} from "../../services/admin-profile.service";
import { toAssetUrl } from "../../../shared/asset-url";

const EMPTY: ProfileDoc = {
  name: "",
  title: "",
  bio: "",
  location: "",
  email: "",
  phone: "",
  image: "",
  available: true,
  portfolioVisible: true,
  availabilityTitle: "Open to opportunities",
  availabilityNote: "Available now — internship or freelance work.",
  show: {
    name: true,
    title: true,
    bio: true,
    location: true,
    email: true,
    phone: true,
    image: true,
  },
};

@Component({
  selector: "app-admin-profile",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-profile.component.html",
  styleUrl: "./admin-profile.component.css",
})
export class AdminProfileComponent implements OnInit {
  profile: ProfileDoc = { ...EMPTY };
  imagePreview = signal("");
  saving = signal(false);
  message = signal("");
  exists = signal(false);
  constructor(private service: AdminProfileService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service.get().subscribe({
      next: (p) => {
        this.profile = { ...EMPTY, ...p, show: { ...EMPTY.show, ...p.show } };
        this.exists.set(true);
        this.imagePreview.set(toAssetUrl(p.image, ""));
      },
      error: () => this.exists.set(false),
    });
  }
  save() {
    this.saving.set(true);
    const payload = {
      ...this.profile,
      show: { ...EMPTY.show, ...this.profile.show },
    };
    const req = this.exists()
      ? this.service.update(payload)
      : this.service.create(payload);
    req.subscribe({
      next: (p) => {
        this.profile = {
          ...this.profile,
          ...p,
          show: { ...EMPTY.show, ...p.show },
        };
        this.exists.set(true);
        this.imagePreview.set(toAssetUrl(p.image, ""));
        this.message.set("Profile saved successfully.");
        this.saving.set(false);
      },
      error: (e) => {
        this.message.set(e.error?.message || "Failed to save profile.");
        this.saving.set(false);
      },
    });
  }
  toggle(field: keyof NonNullable<ProfileDoc["show"]>) {
    this.profile.show = {
      ...this.profile.show,
      [field]: !this.profile.show?.[field],
    };
  }
  togglePortfolio() {
    this.service
      .setPortfolioVisibility(
        this.profile.portfolioVisible !== false ? false : true,
      )
      .subscribe({
        next: (p) => {
          this.profile = { ...this.profile, ...p };
          this.message.set(
            p.portfolioVisible
              ? "Portfolio is visible."
              : "Portfolio is hidden.",
          );
        },
        error: (e) =>
          this.message.set(e.error?.message || "Portfolio visibility failed."),
      });
  }
  onImageSelected(e: Event) {
    const f = (e.target as HTMLInputElement).files?.[0];
    if (!f) return;
    this.service.uploadImage(f).subscribe({
      next: (p) => {
        this.profile = {
          ...this.profile,
          ...p,
          show: { ...this.profile.show, ...p.show },
        };
        this.imagePreview.set(toAssetUrl(p.image, ""));
        this.message.set("Profile image updated.");
      },
      error: (x) =>
        this.message.set(x.error?.message || "Image upload failed."),
    });
  }
  removeImage() {
    this.service
      .update({ image: "", show: { ...this.profile.show, image: false } })
      .subscribe({
        next: (p) => {
          this.profile = {
            ...this.profile,
            ...p,
            show: { ...this.profile.show, ...p.show },
          };
          this.imagePreview.set("");
          this.message.set("Profile image deleted.");
        },
        error: (e) =>
          this.message.set(e.error?.message || "Image delete failed."),
      });
  }
  toggleAvailability() {
    this.service.toggleAvailability().subscribe({
      next: (p) => {
        this.profile = { ...this.profile, ...p };
        this.message.set("Availability status updated.");
      },
      error: (e) =>
        this.message.set(e.error?.message || "Availability update failed."),
    });
  }
}
