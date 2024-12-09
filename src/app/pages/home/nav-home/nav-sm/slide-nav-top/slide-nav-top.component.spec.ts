import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideNavTopComponent } from './slide-nav-top.component';

describe('SlideNavTopComponent', () => {
  let component: SlideNavTopComponent;
  let fixture: ComponentFixture<SlideNavTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideNavTopComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideNavTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
