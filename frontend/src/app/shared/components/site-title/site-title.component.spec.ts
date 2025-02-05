import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteTitleComponent } from './site-title.component';

describe('SiteTitleComponent', () => {
  let component: SiteTitleComponent;
  let fixture: ComponentFixture<SiteTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SiteTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
