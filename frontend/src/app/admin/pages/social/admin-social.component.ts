import { Component, OnInit, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import {
  AdminSocialService,
  SocialDoc,
} from "../../services/admin-social.service";
@Component({
  selector: "app-admin-social",
  standalone: true,
  imports: [FormsModule],
  templateUrl: "./admin-social.component.html",
  styleUrl: "./admin-social.component.css",
})
export class AdminSocialComponent implements OnInit {
  socials = signal<SocialDoc[]>([]);
  newSocial: SocialDoc = { platform: "", url: "", visible: true };
  message = signal("");
  constructor(private service: AdminSocialService) {}
  ngOnInit() {
    this.load();
  }
  load() {
    this.service.getAll().subscribe((x) => this.socials.set(x));
  }
  save(s: SocialDoc) {
    if (!s._id) return;
    this.service
      .update(s._id, s)
      .subscribe({
        next: () => this.load(),
        error: (e) => this.message.set(e.error?.message || "Update failed."),
      });
  }
  add() {
    if (!this.newSocial.platform.trim() || !this.newSocial.url.trim()) return;
    this.service.create(this.newSocial).subscribe({
      next: () => {
        this.newSocial = { platform: "", url: "", visible: true };
        this.load();
      },
      error: (e) => this.message.set(e.error?.message || "Add failed."),
    });
  }
  toggle(s: SocialDoc) {
    if (!s._id) return;
    this.service
      .setVisibility(s._id, s.visible !== false ? false : true)
      .subscribe(() => this.load());
  }
  remove(s: SocialDoc) {
    if (!s._id) return;
    if (!confirm(`Delete ${s.platform} permanently?`)) return;
    this.service.delete(s._id).subscribe(() => this.load());
  }
}
