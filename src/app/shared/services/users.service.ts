import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, take} from 'rxjs';
import IUserData from '../interfaces/IUserData';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private apiURL = environment.backendURL;
  private userData$: BehaviorSubject<IUserData | null> = new BehaviorSubject<IUserData | null>(null);

  constructor(private http: HttpClient,){}

  requestUser() {
    const response = this.http.get<{status: boolean, data: any}>(`${this.apiURL}users`, {withCredentials: true}).pipe(take(1));
    return response;
  }

  setUserData(newUserData: IUserData | null){
    if(!newUserData){
      this.userData$.next(null);
    }else{ 
      this.userData$.next({publicUserID: newUserData.publicUserID, username: newUserData.username});
    }
  }

  getUserData(): Observable<IUserData | null>{
    return this.userData$.asObservable();
  }

  requestPostUsers(username: string, password: string, rememberMe: boolean): Observable<any> {
    const data = this.http.post(
      `${this.apiURL}users`, {username, password, rememberMe}, { withCredentials: true } 
    ).pipe(take(1));
    return data;
  }

  requestDeleteUser(password: string){
    const data = this.http.delete<{ status: boolean; data: any }>(
      `${this.apiURL}users`, 
      { 
        body: { password }, 
        withCredentials: true 
      }
    ).pipe(take(1));
    
    return data;
  }
  
  requestEditUsername(newUsername: string, password: string){
    const data = this.http.put<{ status: boolean; data: any }>(
      `${this.apiURL}users/username`, {newUsername, password}, { withCredentials: true } 
    ).pipe(take(1));
    return data;
  }

  requestEditPassword(newPassword: string, oldPassword: string){
    const data = this.http.put<{ status: boolean; data: any }>(
      `${this.apiURL}users/password`, {newPassword, oldPassword}, { withCredentials: true } 
    ).pipe(take(1));
    return data;
  }
}
