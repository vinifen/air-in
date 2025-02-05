import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import IUserData from '../../../../../../shared/interfaces/IUserData';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { UsersService } from '../../../../../../shared/services/users.service';

@Component({
  selector: 'app-account-main',
  standalone: true,
  imports: [],
  templateUrl: './account-main.component.html',
  // styleUrl: './account-main.component.css'
})
export class AccountMainComponent implements OnInit {
  userData: IUserData | null = null;
  isAccountSettingsActive: boolean = false;

  @Output() accountSettingsToggled = new EventEmitter<boolean>();

  constructor(private authService: AuthService, private userService: UsersService) {}

  ngOnInit(): void {
    this.userService.getUserData().subscribe({
      next: (value) =>{
        this.userData = value;
      }
    })
  }

  async toggleLogout() {
    const isLogged = await firstValueFrom(this.authService.getIsLogged());
   
    if (isLogged) {
      const result = await firstValueFrom(this.authService.requestLogout());
      window.location.reload();
    }
  }

  async toggleAccountSettings() {
    this.isAccountSettingsActive = !this.isAccountSettingsActive;
    this.accountSettingsToggled.emit(this.isAccountSettingsActive);
  }
}
