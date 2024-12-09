import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNavBottomComponent } from './slide-nav-bottom.component';

describe('SlideNavBottomComponent', () => {
  let component: SlideNavBottomComponent;
  let fixture: ComponentFixture<SlideNavBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideNavBottomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideNavBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
