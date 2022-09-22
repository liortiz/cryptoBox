import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesplazamientoComponent } from './desplazamiento.component';

describe('DesplazamientoComponent', () => {
  let component: DesplazamientoComponent;
  let fixture: ComponentFixture<DesplazamientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesplazamientoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DesplazamientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
