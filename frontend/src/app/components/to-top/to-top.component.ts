import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-to-top',
  standalone: true,
  imports: [],
  templateUrl: './to-top.component.html',
  styleUrl: './to-top.component.css',
})
export class ToTopComponent {
  visible = false;

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.visible = window.scrollY > 500;
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
