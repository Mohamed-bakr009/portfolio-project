import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  signal,
} from "@angular/core";
import { IntroComponent } from "../../components/intro/intro.component";
import { HeaderComponent } from "../../components/header/header.component";
import { HeroComponent } from "../../components/hero/hero.component";
import { AboutComponent } from "../../components/about/about.component";
import { SkillsComponent } from "../../components/skills/skills.component";
import { ProjectsComponent } from "../../components/projects/projects.component";
import { ContactComponent } from "../../components/contact/contact.component";
import { FooterComponent } from "../../components/footer/footer.component";
import { CvModalComponent } from "../../components/cv-modal/cv-modal.component";
import { ToTopComponent } from "../../components/to-top/to-top.component";
import { ScrollSpyService } from "../../services/scroll-spy.service";
import { ProfileService } from "../../services/profile.service";
@Component({
  selector: "app-portfolio-page",
  standalone: true,
  imports: [
    IntroComponent,
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ContactComponent,
    FooterComponent,
    CvModalComponent,
    ToTopComponent,
  ],
  templateUrl: "./portfolio-page.component.html",
})
export class PortfolioPageComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  hidden = signal(false);
  constructor(
    private scrollSpy: ScrollSpyService,
    private profile: ProfileService,
  ) {}
  ngOnInit() {
    document.body.style.overflow = "hidden";
    setTimeout(() => (document.body.style.overflow = ""), 4000);
    this.profile
      .getProfile()
      .subscribe((p) => this.hidden.set(!p.portfolioVisible));
  }
  ngAfterViewInit() {
    this.scrollSpy.start();
  }
  ngOnDestroy() {
    this.scrollSpy.stop();
  }
}
