import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountMainComponent } from './account-main.component';

describe('AccountMainComponent', () => {
  let component: AccountMainComponent;
  let fixture: ComponentFixture<AccountMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
