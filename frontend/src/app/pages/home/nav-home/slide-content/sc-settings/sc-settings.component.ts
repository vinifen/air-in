import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DeleteCitiesWModeService } from '../../../delete-cities-w-mode.service';
import { DeleteCitiesComponent } from './delete-cities/delete-cities.component';
import { SettingsMainComponent } from './settings-main/settings-main.component';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-sc-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, DeleteCitiesComponent, SettingsMainComponent],
  templateUrl: './sc-settings.component.html',
  // styleUrl: './sc-settings.component.css'
})
export class ScSettingsComponent implements OnInit{
  isLgScreen: boolean =false;
  settingsContent: string = "settings-main";
  isDeleteCitiesWModeOn$: boolean = false;

  constructor(private breakpointObserver: BreakpointObserver,private deleteCitiesWService: DeleteCitiesWModeService){}
  
  ngOnInit(): void {
    this.breakpointObserver.observe(['(min-width: 1024px)']).subscribe((result) => {
      this.isLgScreen = result.matches;
    });

    this.deleteCitiesWService.getIsDeleteCitiesW().subscribe({
      next: (value) => {
        this.isDeleteCitiesWModeOn$ = value;
      }
    })
  }
}