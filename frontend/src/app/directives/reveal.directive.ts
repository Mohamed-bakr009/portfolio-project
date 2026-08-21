import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
} from "@angular/core";

@Directive({
  selector: "[appReveal]",
  standalone: true,
})
export class RevealDirective implements AfterViewInit, OnDestroy {
  @Input() revealIndex = 0;

  private observer?: IntersectionObserver;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit(): void {
    const element = this.el.nativeElement;
    element.classList.add("reveal", "reveal-stagger");
    element.style.setProperty("--i", String(this.revealIndex % 6));

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            element.classList.add("in");
            this.observer?.unobserve(element);
          }
        });
      },
      { threshold: 0.15 },
    );
    this.observer.observe(element);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
