import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserSessionHandlerService } from './user-session-handler.service';
import { CitiesWSessionHandlerService } from './cities-w-session-handler.service';

@Injectable({
  providedIn: 'root'
})
export class InitializeService {
  isInitialized$ = new BehaviorSubject<boolean>(false);

  constructor(
    private handleUserSession: UserSessionHandlerService,
    private handlerCitiesWeatherSession: CitiesWSessionHandlerService,
  ) { }

  setIsInitialized(value: boolean){
    this.isInitialized$.next(value);
  }

  getIsInitialized(){
    return this.isInitialized$.asObservable();
  }

  async startApp(){
    await this.handleUserSession.checkUserSession();
    await this.handlerCitiesWeatherSession.checkCities();
    
    this.setIsInitialized(true);
  }
}
