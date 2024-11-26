import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBottomSmComponent } from './nav-bottom-sm.component';

describe('NavBottomSmComponent', () => {
  let component: NavBottomSmComponent;
  let fixture: ComponentFixture<NavBottomSmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavBottomSmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavBottomSmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
