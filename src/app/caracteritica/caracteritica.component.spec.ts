import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaracteriticaComponent } from './caracteritica.component';

describe('CaracteriticaComponent', () => {
  let component: CaracteriticaComponent;
  let fixture: ComponentFixture<CaracteriticaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaracteriticaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CaracteriticaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
