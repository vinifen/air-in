import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScCreditsComponent } from './sc-credits.component';

describe('ScCreditsComponent', () => {
  let component: ScCreditsComponent;
  let fixture: ComponentFixture<ScCreditsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScCreditsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScCreditsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
