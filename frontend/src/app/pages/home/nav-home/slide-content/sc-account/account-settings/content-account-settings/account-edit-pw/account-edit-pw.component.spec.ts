import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditPwComponent } from './account-edit-pw.component';

describe('AccountEditPwComponent', () => {
  let component: AccountEditPwComponent;
  let fixture: ComponentFixture<AccountEditPwComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditPwComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
