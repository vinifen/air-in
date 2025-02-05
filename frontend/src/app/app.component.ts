import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgxSpinnerModule } from 'ngx-spinner';
import { InitializeService } from './shared/services/initialize.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgxSpinnerModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'air-in';

  constructor(
    private initializeService: InitializeService
  ){}

  async ngOnInit() {
    await this.initializeService.startApp();
  }

}
