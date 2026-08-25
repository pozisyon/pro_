import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyVisit } from './property-visit';

describe('PropertyVisit', () => {
  let component: PropertyVisit;
  let fixture: ComponentFixture<PropertyVisit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PropertyVisit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PropertyVisit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
