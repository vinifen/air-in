import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom, take } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged$ = new BehaviorSubject<false | true>(false);
  private apiURL= environment.backendURL;

  constructor(
    private http: HttpClient,
  ){}

  setIsLogged(value: boolean){
    this.isLogged$.next(value);
  }

  getIsLogged(){
    return this.isLogged$.asObservable();
  }

  async validateSession(response: {status: boolean, data: any}) {
    if (response.status == false || response.data.stStatus == false) {
      return await this.handleInvalidSession(response);
    } else {
      return await this.handleValidSession();
    }
  }

  requestLogin(username: string, password: string, rememberMe: boolean){
    const data = this.http.post<{status: boolean, data: any}>(
      `${this.apiURL}auth/login`, {username, password, rememberMe}, {withCredentials: true }
    ).pipe(take(1));
    return data;
  }

  requestLogout(){
    const data = this.http.post(
      `${this.apiURL}auth/logout`, {}, {withCredentials: true }
    ).pipe(take(1));
    this.setIsLogged(false);
    return data;
  }
  

  private async handleInvalidSession(response: any) {
    if (response.data.hasRt == true) {
      
      const result = await this.requestTryNewSession();
      
      if (result === true) {
        this.setIsLogged(true);
        return {status: true, newSession: true}
      }
    }
    this.setIsLogged(false);
    return {status: false, newSession: false}
  }

  private async handleValidSession(){
    this.setIsLogged(true);
    return {status: true, newSession: false}
  }

  private async requestTryNewSession() {
    try {
      const data = this.http.post<{ data: any, status: boolean }>(
        `${this.apiURL}auth/refresh-token`, {}, { withCredentials: true }
      ).pipe(take(1));
  
      const result = await firstValueFrom(data);
      return result.status;
    } catch (error) {
      return false
    }
  }
}
