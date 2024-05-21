import { Component } from '@angular/core';
import {AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements AfterViewInit{

  isResponsive: boolean = false;

  ngAfterViewInit() {
    this.checkResponsive(window.innerWidth);
  }


  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkResponsive(event.target.innerWidth);
  }

  checkResponsive(width: number) {
    this.isResponsive = width < 1090; // Defina o limite para telas responsivas
  }

  navigateToTop() {
    window.scrollTo(0,0);
}

}
