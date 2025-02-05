import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ActiveContentAuthNavService {
  private activeContent$ = new BehaviorSubject<string | null>('login');

  setActiveContent(content: string | null){
    this.activeContent$.next(content);
  }

  getActiveContent(){
    return this.activeContent$.asObservable();
  }
}