import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavHomeLgComponent } from './sidenav-home-lg.component';

describe('SidenavHomeLgComponent', () => {
  let component: SidenavHomeLgComponent;
  let fixture: ComponentFixture<SidenavHomeLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavHomeLgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavHomeLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
