import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCitiesComponent } from './delete-cities.component';

describe('DeleteCitiesComponent', () => {
  let component: DeleteCitiesComponent;
  let fixture: ComponentFixture<DeleteCitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteCitiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteCitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
