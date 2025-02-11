import { Component, EventEmitter, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { UsersService } from '../../../../../../../../shared/services/users.service';
import { TitleContentService } from '../../../../../title-content.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-account-edit-pw',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './account-edit-pw.component.html',
  // styleUrl: './account-edit-pw.component.css'
})
export class AccountEditPwComponent {
  inputNewPassword = '';
  inputPassword = '';
  inputConfirmNewPassword = '';
  errorMessage = '';
  successMessage = '';
  isFormValid = false;

  @Output() returnSettings = new EventEmitter<string>();

  constructor(
    private userService: UsersService,
    private titleContentService: TitleContentService
  ) {}

  validateForm(): void {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,90}$/;

    if (!this.inputNewPassword.trim() || !this.inputPassword.trim() || !this.inputConfirmNewPassword.trim()) {
      this.errorMessage = 'All fields are required.';
    } else if (this.inputNewPassword !== this.inputConfirmNewPassword) {
      this.errorMessage = 'New password and confirmation do not match.';
    } else if (!passwordRegex.test(this.inputNewPassword)) {
      this.errorMessage = 'Password must be 4-90 characters, with at least one uppercase letter and one number.';
    } else {
      this.errorMessage = '';
    }

    this.isFormValid = !this.errorMessage;
  }

  ngOnInit(): void {
    this.titleContentService.setTitleContent('New Password');
  }

  async onSubmit() {
    this.validateForm();

    if (!this.isFormValid) return;

    this.errorMessage = '';
    this.successMessage = '';

    try {
      const result = await firstValueFrom(this.userService.requestEditPassword(this.inputNewPassword, this.inputPassword));
      
      if (result && result.status) {
        this.successMessage = result.data.message || 'Password updated successfully!';
        setTimeout(() => {
          window.location.reload();
        }, 800);
      } else {
        this.errorMessage = result?.data?.message || 'Failed to update the password.';
      }
    } catch (error: any) {
      console.error('Unexpected error:', error);
      this.errorMessage = error.error?.data?.message || 'An unexpected error occurred.';
    } finally {
      this.inputNewPassword = '';
      this.inputPassword = '';
      this.inputConfirmNewPassword = '';
    }
  }

  toggleReturnSettings() {
    this.titleContentService.setTitleContent('Account Settings');
    this.returnSettings.emit('settings');
  }
}
