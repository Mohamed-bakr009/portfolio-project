import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-intro",
  standalone: true,
  imports: [],
  templateUrl: "./intro.component.html",
  styleUrl: "./intro.component.css",
})
export class IntroComponent implements OnInit {
  introFinished = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.introFinished = true;
    }, 4000);
  }
}
