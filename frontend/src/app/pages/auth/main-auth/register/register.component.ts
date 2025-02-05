import { Component } from '@angular/core';
import { UserSessionHandlerService } from '../../../../shared/services/user-session-handler.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  // styleUrl: './register.component.css'
})
export class RegisterComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  isFormValid: boolean = false;

  inputUsername: string = "";
  inputPassword: string = "";
  inputPasswordConfirm: string = "";
  inputRememberMe: boolean = true; 

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private router: Router
  ) {}

  validateForm(): void {
    const usernameRegex = /^[A-Za-z0-9]{2,30}$/;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{4,90}$/;
    this.isFormValid = !!this.inputUsername && !!this.inputPassword && !!this.inputPasswordConfirm && this.inputPassword === this.inputPasswordConfirm;
    
    this.errorMessage = !this.isFormValid && this.inputPassword !== this.inputPasswordConfirm ? 'Passwords do not match.' : '';

    if (!usernameRegex.test(this.inputUsername)) {

      this.errorMessage = "Username must be between 2 and 30 characters and contain only letters and numbers.";
    }else if (!passwordRegex.test(this.inputPassword) || !passwordRegex.test(this.inputPasswordConfirm)) {

      this.errorMessage = "Password must be between 4 and 90 characters, with at least one uppercase letter and one number.";
      
    }else {
      this.errorMessage = null;
    }

    this.isFormValid = !this.errorMessage;
  }
  
  async onSubmit() {
  
    if (!this.inputUsername || !this.inputPassword || !this.inputPasswordConfirm) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = null;
      return false;
    }
  
    if (this.inputPassword !== this.inputPasswordConfirm) {
      this.errorMessage = 'Passwords do not match.';
      this.successMessage = null;
      return false;
    }
  
    this.errorMessage = null;
  
    try {
      const data = await this.handleUserSession.registerUserSession(this.inputUsername, this.inputPassword, this.inputRememberMe);
      if (data.status) {
        this.successMessage = data.message; 
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }else{
        this.errorMessage = data.message
      }
    } catch (err: any) {
      this.errorMessage = err.message || "An unexpected error occurred"; 
      this.successMessage = null;
    }
  
    return false;
  }
}
