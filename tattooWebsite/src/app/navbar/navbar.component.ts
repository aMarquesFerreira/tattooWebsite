// src/app/navbar/navbar.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  menuActive = false;

  toggleMenu() {
    this.menuActive = !this.menuActive;

    const menuIcon = document.querySelector('.menu-icon');
    if (menuIcon) {
      if (this.menuActive) {
        menuIcon.classList.add('active');
      } else {
        menuIcon.classList.remove('active');
      }
    }
  }

  scrollToFooter() {
    const footerElement = document.getElementById('footer');
    if (footerElement) {
      footerElement.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
