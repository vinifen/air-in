import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { AuthService } from '../../../../../../shared/services/auth.service';
import { CitiesWeatherService } from '../../../../../../shared/services/cities-weather.service';
import { DeleteCitiesWModeService } from '../../../../delete-cities-w-mode.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-delete-cities',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './delete-cities.component.html',
  // styleUrl: './delete-cities.component.css'
})
export class DeleteCitiesComponent implements OnDestroy{
  @Input() isDeleteCitiesWModeOn$!: boolean;
  constructor(
    private authService: AuthService, 
    private deleteCitiesWService: DeleteCitiesWModeService, 
    private citiesWService: CitiesWeatherService,
  ){}

  async submitDeleteCities(){
    const isLogged = await firstValueFrom (this.authService.getIsLogged());
    const citiesToDelete = await firstValueFrom (this.deleteCitiesWService.getCitiesToDelete());
    
    if(citiesToDelete.length > 0){
      if(isLogged){
        const resultDeleteCities = await firstValueFrom(this.citiesWService.deleteCities(citiesToDelete));
        if(resultDeleteCities.status){
          this.deleteCitiesWService.removeSessionCities(citiesToDelete);
        }else{
          console.error(resultDeleteCities.data.message);
        } 
      }else{
        this.deleteCitiesWService.removeSessionCities(citiesToDelete);
      }
    }
    this.deleteCitiesWService.setCitiesToDelete([]);
  }

  toggleDeleteMode(){
    this.deleteCitiesWService.setCitiesToDelete([]);
    this.deleteCitiesWService.setIsDeleteCitiesW(!this.isDeleteCitiesWModeOn$);
  }

  ngOnDestroy(): void {
    if(this.isDeleteCitiesWModeOn$){
     this.toggleDeleteMode();
    }
  }
}
