import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Espaco3dComponent } from './espaco3d.component';

describe('Espaco3dComponent', () => {
  let component: Espaco3dComponent;
  let fixture: ComponentFixture<Espaco3dComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [Espaco3dComponent]
    });
    fixture = TestBed.createComponent(Espaco3dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
