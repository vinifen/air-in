import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsersService } from '../../../../../../../../shared/services/users.service';
import { firstValueFrom } from 'rxjs';
import { TitleContentService } from '../../../../../title-content.service';

@Component({
  selector: 'app-account-edit-usnm',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './account-edit-usnm.component.html',
  // styleUrl: './account-edit-usnm.component.css'
})
export class AccountEditUsnmComponent implements OnInit {
  inputNewUsername = "";
  inputPassword = "";
  errorMessage = "";
  successMessage = "";
  isFormValid = false;

  @Output() returnSettings = new EventEmitter<string>();

  constructor(private userService: UsersService, private titleContentService: TitleContentService) {}

  validateForm(): void {
    const usernameRegex = /^[A-Za-z0-9]{2,30}$/;

    if (!this.inputNewUsername.trim() || !this.inputPassword.trim()) {
      this.errorMessage = "Both username and password must be filled.";
      this.isFormValid = false;
      return;
    }

    if (!usernameRegex.test(this.inputNewUsername)) {
      this.errorMessage = "Username must be 2-30 characters long and contain only letters and numbers.";
      this.isFormValid = false;
      return;
    }

    this.errorMessage = ""; 
    this.isFormValid = true;
  }

  ngOnInit(): void {
    this.titleContentService.setTitleContent("New Username");
  }

  async onSubmit() {
    if (!this.isFormValid) {
      return;
    }

    this.errorMessage = "";
    this.successMessage = "";

    try {
      const result = await firstValueFrom(
        this.userService.requestEditUsername(this.inputNewUsername, this.inputPassword)
      );

      if (result && result.status) {
        this.successMessage = result.data.message || "Username updated successfully!";
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        this.errorMessage = result?.data?.message || "Failed to update the username.";
      }
    } catch (error: any) {
      console.error("Unexpected error:", error);
      this.errorMessage = error.error.data.message;
    } finally {
      this.inputNewUsername = ""; 
      this.inputPassword = ""; 
    }
  }

  toggleReturnSettings() {
    this.titleContentService.setTitleContent("Account Settings");
    this.returnSettings.emit("settings");
  }
}