import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavTopAuthSmComponent } from './nav-top-auth-sm.component';

describe('NavTopAuthSmComponent', () => {
  let component: NavTopAuthSmComponent;
  let fixture: ComponentFixture<NavTopAuthSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavTopAuthSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavTopAuthSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
