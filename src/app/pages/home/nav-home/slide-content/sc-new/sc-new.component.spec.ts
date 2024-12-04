import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScNewComponent } from './sc-new.component';

describe('ScNewComponent', () => {
  let component: ScNewComponent;
  let fixture: ComponentFixture<ScNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScNewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ScNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
