import { Component, ElementRef, OnInit, OnDestroy, HostListener } from '@angular/core';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

@Component({
  selector: 'app-espaco3d',
  templateUrl: './espaco3d.component.html',
  styleUrls: ['./espaco3d.component.css']
})
export class Espaco3dComponent implements OnInit, OnDestroy {
  private renderer!: THREE.WebGLRenderer;
  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private controls!: OrbitControls;
  private animationId!: number;

  constructor(private elRef: ElementRef) {}

  ngOnInit(): void {
    this.initThreeJs();
    this.onResize(); // Ajusta o tamanho inicial
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationId);
    this.renderer.dispose();
  }

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    const canvasParent = this.elRef.nativeElement.querySelector('.col-12');
    const width = canvasParent.clientWidth;
    const height = canvasParent.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }

  private initThreeJs(): void {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    this.renderer = new THREE.WebGLRenderer({ canvas: this.elRef.nativeElement.querySelector('#three-canvas') });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // Carregar mapa equiretangular e aplicá-lo a uma esfera
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load('./assets/interior.png', (texture) => {
      const geometry = new THREE.SphereGeometry(500, 60, 40);
      const material = new THREE.MeshBasicMaterial({
        map: texture,
        side: THREE.DoubleSide
      });
      const sphere = new THREE.Mesh(geometry, material);
      this.scene.add(sphere);
    });

    // Posicionamento da câmera
    this.camera.position.z = 0.01; // Posição perto do centro da esfera

    // Iniciar animação
    this.animate();
  }

  private animate(): void {
    this.animationId = requestAnimationFrame(() => this.animate());
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }
}
