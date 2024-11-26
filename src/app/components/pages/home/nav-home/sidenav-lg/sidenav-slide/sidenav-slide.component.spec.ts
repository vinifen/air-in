import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavSlideComponent } from './sidenav-slide.component';

describe('SidenavSlideComponent', () => {
  let component: SidenavSlideComponent;
  let fixture: ComponentFixture<SidenavSlideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavSlideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavSlideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
