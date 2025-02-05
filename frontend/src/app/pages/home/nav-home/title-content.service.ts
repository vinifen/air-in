import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleContentService {
  private title$ = new BehaviorSubject<string>('');

 setTitleContent(title: string){
  this.title$.next(title);
 }

 getTitleContent(){
  return this.title$.asObservable();
 }
}
