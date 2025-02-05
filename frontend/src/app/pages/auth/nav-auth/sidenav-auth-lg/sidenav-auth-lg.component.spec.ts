import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavAuthLgComponent } from './sidenav-auth-lg.component';

describe('SidenavAuthLgComponent', () => {
  let component: SidenavAuthLgComponent;
  let fixture: ComponentFixture<SidenavAuthLgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavAuthLgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavAuthLgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
