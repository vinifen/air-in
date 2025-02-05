import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScSettingsComponent } from './sc-settings.component';

describe('ScSettingsComponent', () => {
  let component: ScSettingsComponent;
  let fixture: ComponentFixture<ScSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScSettingsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
