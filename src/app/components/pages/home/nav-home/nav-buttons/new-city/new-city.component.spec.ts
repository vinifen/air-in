import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCityComponent } from './new-city.component';

describe('NewCityComponent', () => {
  let component: NewCityComponent;
  let fixture: ComponentFixture<NewCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
