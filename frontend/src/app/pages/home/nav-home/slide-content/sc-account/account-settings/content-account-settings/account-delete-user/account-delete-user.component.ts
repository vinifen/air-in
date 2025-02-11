import { Component, EventEmitter, Output } from '@angular/core';
import { UsersService } from '../../../../../../../../shared/services/users.service';
import { TitleContentService } from '../../../../../title-content.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-account-delete-user',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './account-delete-user.component.html',
  // styleUrl: './account-delete-user.component.css'
})
export class AccountDeleteUserComponent {
  inputPassword = '';
  errorMessage = '';
  successMessage = '';
  isFormValid = false;

  @Output() returnSettings = new EventEmitter<string>();

  constructor(
    private userService: UsersService,
    private titleContentService: TitleContentService
  ) {}

  validateForm(): void {
    if (!this.inputPassword.trim()) {
      this.errorMessage = 'Password is required.';
    } else {
      this.errorMessage = '';
    }

    this.isFormValid = !this.errorMessage;
  }

  ngOnInit(): void {
    this.titleContentService.setTitleContent('Delete Account');
  }

  async onSubmit() {
    this.validateForm();

    if (!this.isFormValid) return;

    this.errorMessage = '';
    this.successMessage = '';

    try {
      const result = await firstValueFrom(
        this.userService.requestDeleteUser(this.inputPassword)
      );

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
      this.inputPassword = '';
    }
  }

  toggleReturnSettings() {
    this.titleContentService.setTitleContent('Account Settings');
    this.returnSettings.emit('settings');
  }
}
