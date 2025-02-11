import { Component } from '@angular/core';
import { UserSessionHandlerService } from '../../../../shared/services/user-session-handler.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string | null = null;
  successMessage: string | null = null; 
  isFormValid: boolean = false;

  inputUsername: string = "";
  inputPassword: string = "";
  inputRememberMe: boolean = true;

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private router: Router
  ) {}

  validateForm(): void {
    const usernameRegex = /^[A-Za-z0-9\s]{2,30}$/;
    const passwordRegex = /^(?!\s)(?!.*\s$)(?=(.*[A-Za-z\d]){6,})[A-Za-z\d@_.!?\-/]{4,90}$/;
  
    if (!usernameRegex.test(this.inputUsername)) {
      this.errorMessage = "Username: 2-30 chars, only A-Z, 0-9.";
    }
    else if (!passwordRegex.test(this.inputPassword)) {
      this.errorMessage = "Password: 4-90 chars, min 6 letters, only A-Z, 0-9, @ _ - . ! ? /. No spaces at start/end.";
    }
    else {
      this.errorMessage = null;
    }
  
    this.isFormValid = !this.errorMessage;
  }

  
  async onSubmit() {
  
    if (!this.inputUsername || !this.inputPassword) {
      this.errorMessage = 'All fields are required.';
      this.successMessage = null;
      return false;
    }
  
    this.errorMessage = null;
  
    try {
      const data = await this.handleUserSession.loginUserSesion(this.inputUsername.trim(), this.inputPassword.trim(), this.inputRememberMe);

      if (data.status) {
        this.successMessage = data.message; 
        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      }else{
        this.errorMessage = data.message
      }
    } catch (err: any) {
      console.log(err, "ERROR LOGIN COMPONENT")
      this.errorMessage = err.message;
      this.successMessage = null;
    }
  
    return false;
  }
}
