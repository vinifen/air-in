import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBottomHomeSmComponent } from './nav-bottom-home-sm.component';

describe('NavBottomHomeSmComponent', () => {
  let component: NavBottomHomeSmComponent;
  let fixture: ComponentFixture<NavBottomHomeSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBottomHomeSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBottomHomeSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
