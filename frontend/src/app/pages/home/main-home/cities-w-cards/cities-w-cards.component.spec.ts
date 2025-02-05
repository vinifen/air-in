import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CitiesWCardsComponent } from './cities-w-cards.component';

describe('CitiesWCardsComponent', () => {
  let component: CitiesWCardsComponent;
  let fixture: ComponentFixture<CitiesWCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesWCardsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesWCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
