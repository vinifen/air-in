import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopHomeSmComponent } from './nav-top-home-sm.component';

describe('NavTopHomeSmComponent', () => {
  let component: NavTopHomeSmComponent;
  let fixture: ComponentFixture<NavTopHomeSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTopHomeSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTopHomeSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
