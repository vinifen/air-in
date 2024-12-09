import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideSidenavComponent } from './slide-sidenav.component';

describe('SlideSidenavComponent', () => {
  let component: SlideSidenavComponent;
  let fixture: ComponentFixture<SlideSidenavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlideSidenavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlideSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
