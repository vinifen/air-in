import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopSlideComponent } from './nav-top-slide.component';

describe('NavTopSlideComponent', () => {
  let component: NavTopSlideComponent;
  let fixture: ComponentFixture<NavTopSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTopSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTopSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
