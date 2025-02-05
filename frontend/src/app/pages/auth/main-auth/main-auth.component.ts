import { Component, OnInit } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ActiveContentAuthNavService } from '../active-content-auth-nav.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-main-auth',
  standalone: true,
  imports: [CommonModule, LoginComponent, RegisterComponent],
  templateUrl: './main-auth.component.html',
  // styleUrl: './main-auth.component.css'
})
export class MainAuthComponent implements OnInit {
  activeContent: string | null = null;

  constructor(private activeContentService$: ActiveContentAuthNavService){}

  ngOnInit(): void {
    this.activeContentService$.getActiveContent().subscribe((content) =>{
      this.activeContent = content;
    })
  }
}
