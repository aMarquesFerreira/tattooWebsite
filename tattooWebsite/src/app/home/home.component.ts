import { Component, AfterViewInit, ViewChild, ElementRef, HostListener } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  @ViewChild('testimonialsWrapper', { static: false }) testimonialsWrapper!: ElementRef;
  currentTestimonial: number = 0;
  isResponsive: boolean = false;

  ngAfterViewInit() {
    this.checkResponsive(window.innerWidth);
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResponsive(event.target.innerWidth);
  }

  checkResponsive(width: number) {
    this.isResponsive = width < 768; // Defina o limite para telas responsivas
    if (this.isResponsive && this.testimonialsWrapper) {
      this.showTestimonial(this.currentTestimonial);
    }
  }

  showTestimonial(index: number) {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      testimonials.forEach((testimonial: HTMLElement, i: number) => {
        testimonial.style.transform = `translateX(${(i - index) * 100}%)`;
      });
    }
  }

  prevTestimonial() {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      this.currentTestimonial = (this.currentTestimonial - 1 + testimonials.length) % testimonials.length;
      this.showTestimonial(this.currentTestimonial);
    }
  }

  nextTestimonial() {
    if (this.testimonialsWrapper) {
      const testimonials = this.testimonialsWrapper.nativeElement.querySelectorAll('.testimonials-container');
      this.currentTestimonial = (this.currentTestimonial + 1) % testimonials.length;
      this.showTestimonial(this.currentTestimonial);
    }
  }
}
