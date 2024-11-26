import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBottomSlideComponent } from './nav-bottom-slide.component';

describe('NavBottomSlideComponent', () => {
  let component: NavBottomSlideComponent;
  let fixture: ComponentFixture<NavBottomSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBottomSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBottomSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
