import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBottomAuthSmComponent } from './nav-bottom-auth-sm.component';

describe('NavBottomAuthSmComponent', () => {
  let component: NavBottomAuthSmComponent;
  let fixture: ComponentFixture<NavBottomAuthSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBottomAuthSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBottomAuthSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
