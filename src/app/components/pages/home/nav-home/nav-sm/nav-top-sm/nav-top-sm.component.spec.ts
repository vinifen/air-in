import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopSmComponent } from './nav-top-sm.component';

describe('NavTopSmComponent', () => {
  let component: NavTopSmComponent;
  let fixture: ComponentFixture<NavTopSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTopSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTopSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
