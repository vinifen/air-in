import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountEditUsnmComponent } from './account-edit-usnm.component';

describe('AccountEditUsnmComponent', () => {
  let component: AccountEditUsnmComponent;
  let fixture: ComponentFixture<AccountEditUsnmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountEditUsnmComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountEditUsnmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
