import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchBarNavComponent } from './search-bar-nav.component';

describe('SearchBarNavComponent', () => {
  let component: SearchBarNavComponent;
  let fixture: ComponentFixture<SearchBarNavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchBarNavComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchBarNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
