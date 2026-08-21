import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  signal,
} from "@angular/core";
import { ProfileService } from "../../services/profile.service";
import { SkillsService } from "../../services/skills.service";
import { Profile, SocialLink } from "../../models/portfolio.models";
import { DEFAULT_PROFILE } from "../../data/profile.data";

@Component({
  selector: "app-hero",
  standalone: true,
  imports: [],
  templateUrl: "./hero.component.html",
  styleUrl: "./hero.component.css",
})
export class HeroComponent implements OnInit {
  readonly profile = signal<Profile>(DEFAULT_PROFILE);
  readonly techIcons = signal<{ title: string; icon: string; cls: string }[]>(
    [],
  );
  availabilityOpen = false;
  private hoverCapable = false;
  constructor(
    private el: ElementRef<HTMLElement>,
    private profileService: ProfileService,
    private skillsService: SkillsService,
  ) {
    if (typeof window !== "undefined")
      this.hoverCapable = window.matchMedia(
        "(hover:hover) and (pointer:fine)",
      ).matches;
  }
  ngOnInit(): void {
    this.profileService.getProfile().subscribe((p) => this.profile.set(p));
    this.skillsService.getTechStrip().subscribe((items) =>
      this.techIcons.set(
        items.map((i) => ({
          title: i.name,
          icon: i.icon || "fa-solid fa-code",
          cls: "",
        })),
      ),
    );
  }
  socialIcon(s: SocialLink): string {
    if (s.icon) return s.icon;
    const p = s.platform.toLowerCase();
    if (p.includes("github")) return "fa-brands fa-github";
    if (p.includes("linkedin")) return "fa-brands fa-linkedin-in";
    if (p.includes("instagram")) return "fa-brands fa-instagram";
    if (p.includes("facebook")) return "fa-brands fa-facebook";
    if (p.includes("youtube")) return "fa-brands fa-youtube";
    if (p.includes("twitter") || p.includes("x"))
      return "fa-brands fa-x-twitter";
    if (p.includes("whatsapp")) return "fa-brands fa-whatsapp";
    return "fa-solid fa-link";
  }
  toggleAvailability(e: Event) {
    e.stopPropagation();
    this.availabilityOpen = !this.availabilityOpen;
  }
  @HostListener("document:click", ["$event"]) onDocumentClick(e: MouseEvent) {
    if (
      this.availabilityOpen &&
      !this.el.nativeElement.contains(e.target as Node)
    )
      this.availabilityOpen = false;
  }
  @HostListener("document:keydown.escape") onEscape() {
    this.availabilityOpen = false;
  }
  onHeroArtMouseMove(e: MouseEvent) {
    if (!this.hoverCapable) return;
    const art = e.currentTarget as HTMLElement,
      tilt = art.querySelector<HTMLElement>("#portraitTilt");
    if (!tilt) return;
    const r = art.getBoundingClientRect();
    tilt.style.transform = `perspective(900px) rotateX(${((e.clientY - r.top) / r.height - 0.5) * -16}deg) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 16}deg)`;
  }
  onHeroArtMouseLeave(e: MouseEvent) {
    const t = (e.currentTarget as HTMLElement).querySelector<HTMLElement>(
      "#portraitTilt",
    );
    if (t) t.style.transform = "perspective(900px) rotateX(0) rotateY(0)";
  }
  onImageError(e: Event) {
    const img = e.target as HTMLImageElement;
    img.style.display = "none";
    (img.nextElementSibling as HTMLElement | null)?.style.setProperty(
      "display",
      "flex",
    );
  }
}
