import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCitySlideContentComponent } from './new-city-slide-content.component';

describe('NewCitySlideContentComponent', () => {
  let component: NewCitySlideContentComponent;
  let fixture: ComponentFixture<NewCitySlideContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewCitySlideContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewCitySlideContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
