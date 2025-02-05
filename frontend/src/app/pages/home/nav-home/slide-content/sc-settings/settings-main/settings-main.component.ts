import { Component, Input } from '@angular/core';
import { DeleteCitiesWModeService } from '../../../../delete-cities-w-mode.service';

@Component({
  selector: 'app-settings-main',
  standalone: true,
  imports: [],
  templateUrl: './settings-main.component.html',
  // styleUrl: './settings-main.component.css'
})
export class SettingsMainComponent {
  @Input() isDeleteCitiesWModeOn$!: boolean;
  constructor(private deleteCitiesWService: DeleteCitiesWModeService){}

  toggleDeleteMode(){
    this.deleteCitiesWService.setCitiesToDelete([]);
    this.deleteCitiesWService.setIsDeleteCitiesW(!this.isDeleteCitiesWModeOn$);
  }
}
