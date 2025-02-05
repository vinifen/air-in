import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountDeleteUserComponent } from './content-account-settings/account-delete-user/account-delete-user.component';
import { AccountEditUsnmComponent } from './content-account-settings/account-edit-usnm/account-edit-usnm.component';
import { AccountEditPwComponent } from './content-account-settings/account-edit-pw/account-edit-pw.component';
import { CommonModule } from '@angular/common';
import { TitleContentService } from '../../../title-content.service';

@Component({
  selector: 'app-account-settings',
  standalone: true,
  imports: [CommonModule, AccountEditUsnmComponent, AccountEditPwComponent, AccountDeleteUserComponent],
  templateUrl: './account-settings.component.html',
  // styleUrl: './account-settings.component.css'
})
export class AccountSettingsComponent implements OnInit {
  accountSettingsContent = "settings";

  @Output() accountSettingsToggled = new EventEmitter<boolean>();

  constructor(private titleContentService: TitleContentService){}

  ngOnInit(): void {
    this.titleContentService.setTitleContent("Account Settings");
  }

  
  toggleAccountSettingsContent(value: string){
    this.accountSettingsContent = value;
  }

  
  toggleReturnMain(){
    this.titleContentService.setTitleContent("");
    this.accountSettingsToggled.emit(false);
  }
}
