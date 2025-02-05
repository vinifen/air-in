import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchCitiesService {
  citiesSearched$ = new BehaviorSubject<string>("");
  constructor() { }

  setCitiesSearched(cities: string){
    this.citiesSearched$.next(cities);
  }

  getCitiesSearched(){
    return this.citiesSearched$.asObservable();
  }
}
