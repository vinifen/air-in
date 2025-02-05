import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScAccountComponent } from './sc-account.component';

describe('ScAccountComponent', () => {
  let component: ScAccountComponent;
  let fixture: ComponentFixture<ScAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScAccountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
