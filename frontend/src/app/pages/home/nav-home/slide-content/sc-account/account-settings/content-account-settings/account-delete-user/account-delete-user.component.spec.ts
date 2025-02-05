import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteUserComponent } from './account-delete-user.component';

describe('AccountDeleteUserComponent', () => {
  let component: AccountDeleteUserComponent;
  let fixture: ComponentFixture<AccountDeleteUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountDeleteUserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountDeleteUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
