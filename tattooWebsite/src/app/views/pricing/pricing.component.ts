import { Component } from '@angular/core';
import {AfterViewInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css']
})
export class PricingComponent implements AfterViewInit {

  isResponsive: boolean = false;
  selectedStyle: string = ''; // Adiciona a variável para armazenar o estilo selecionado

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

  // Adiciona a função para capturar o estilo de tatuagem selecionado
  onStyleChange(event: any) {
    this.selectedStyle = event.target.value; // Atualiza o estilo selecionado
  }
}
