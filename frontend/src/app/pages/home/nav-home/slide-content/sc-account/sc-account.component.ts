import { Component,OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { AccountMainComponent } from './account-main/account-main.component';
import { BreakpointObserver } from '@angular/cdk/layout';


@Component({
  selector: 'app-sc-account',
  standalone: true,
  imports: [CommonModule, AccountSettingsComponent, AccountMainComponent],
  templateUrl: './sc-account.component.html',
  // styleUrl: './sc-account.component.css'
})
export class ScAccountComponent implements OnInit{
  isAccountSettingsActive: boolean = false;
  isLgScreen: boolean = false

  constructor(private breakpointObserver: BreakpointObserver){}

  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 1024px)']).subscribe((result) => {
      this.isLgScreen = result.matches;
    });
  }

  
  toggleAccountSettings(event: boolean){
    this.isAccountSettingsActive = event;
  }
}
