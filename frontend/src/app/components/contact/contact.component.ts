import { Component, OnInit, signal } from "@angular/core";
import { RevealDirective } from "../../directives/reveal.directive";
import { ProfileService } from "../../services/profile.service";
import { Profile } from "../../models/portfolio.models";
import { DEFAULT_PROFILE } from "../../data/profile.data";

@Component({
  selector: "app-contact",
  standalone: true,
  imports: [RevealDirective],
  templateUrl: "./contact.component.html",
  styleUrl: "./contact.component.css",
})
export class ContactComponent implements OnInit {
  readonly profile = signal<Profile>(DEFAULT_PROFILE);

  constructor(private profileService: ProfileService) {}

  ngOnInit(): void {
    this.profileService
      .getProfile()
      .subscribe((profile) => this.profile.set(profile));
  }

  socialIcon(s: any): string {
    if (s.icon) return s.icon;
    const p = (s.platform || "").toLowerCase();
    if (p.includes("github")) return "fa-brands fa-github";
    if (p.includes("linkedin")) return "fa-brands fa-linkedin-in";
    if (p.includes("instagram")) return "fa-brands fa-instagram";
    if (p.includes("facebook")) return "fa-brands fa-facebook";
    if (p.includes("youtube")) return "fa-brands fa-youtube";
    if (p === "x" || p.includes("twitter")) return "fa-brands fa-x-twitter";
    if (p.includes("whatsapp")) return "fa-brands fa-whatsapp";
    if (p.includes("telegram")) return "fa-brands fa-telegram";
    if (p.includes("behance")) return "fa-brands fa-behance";
    return "fa-solid fa-link";
  }
}
