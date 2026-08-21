import { Component, HostListener, OnInit, signal } from "@angular/core";

import { CvModalService } from "../../services/cv-modal.service";
import { CvData, CvService } from "../../services/cv.service";
import { ProfileService } from "../../services/profile.service";
import { Profile } from "../../models/portfolio.models";
import { DEFAULT_PROFILE } from "../../data/profile.data";

@Component({
  selector: "app-cv-modal",
  standalone: true,
  imports: [],
  templateUrl: "./cv-modal.component.html",
  styleUrl: "./cv-modal.component.css",
})
export class CvModalComponent implements OnInit {
  readonly profile = signal<Profile>(DEFAULT_PROFILE);
  readonly cv = signal<CvData>({
    summary: "",
    projects: [],
    education: [],
    training: [],
    experience: [],
    techSkills: [],
    softSkills: [],
    languages: [],
    pdfUrl: "",
    available: false,
  });

  constructor(
    readonly cvModal: CvModalService,
    private cvService: CvService,
    private profileService: ProfileService,
  ) {}

  ngOnInit(): void {
    this.profileService
      .getProfile()
      .subscribe((profile) => this.profile.set(profile));
    this.cvService.getCv().subscribe((cv) => this.cv.set(cv));
  }

  close(): void {
    this.cvModal.close();
  }

  onBackdropClick(event: MouseEvent): void {
    if (event.target === event.currentTarget) this.close();
  }

  @HostListener("document:keydown.escape")
  onEscape(): void {
    if (this.cvModal.isOpen()) this.close();
  }
}
