import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { AuthService } from './auth.service';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class UserSessionHandlerService {
  isInitialized$ = new BehaviorSubject<boolean>(false);
  constructor(private authService: AuthService, private userService: UsersService) {}

  async checkUserSession() {
    try {
      const userResponse: { status: boolean, data: any } = await firstValueFrom(this.userService.requestUser());
      const userResponseData = userResponse.data;
  
      if (userResponse.status && userResponseData.stStatus && userResponseData.content.publicUserID) {
        this.authService.setIsLogged(true);
        this.userService.setUserData(userResponseData.content);
        return userResponseData;
      }
      this.authService.setIsLogged(false);
      return userResponseData;
    } catch (error) {
      console.error('Error checking user session:', error);
      throw error;
    }
  }


  async handlerErrorRequest(userResponse: {status: boolean, data: any} ){
    const resultSession: {status: boolean, newSession: boolean} = await this.authService.validateSession(userResponse);

    if (resultSession.status == true && resultSession.newSession == true)  {
      return {status: true, newSession: true}
    }
    
    if (resultSession.status == false || !userResponse.data.content) {
      this.authService.setIsLogged(false);
      this.userService.setUserData(null);
      return {status: false, message: "Invalid Session", newSession: false};
    }
    this.userService.setUserData(userResponse.data.content);
    return {status: userResponse.status, data: userResponse.data, newSession: false};
  }


  async registerUserSession(username: string, password: string, rememberMe: boolean) {
    return new Promise<{status: boolean, message: string}>((resolve, reject) => {
      this.userService.requestPostUsers(username, password, rememberMe).subscribe({
        next: (value) => {
          if(value.status == true){
            this.authService.setIsLogged(true);
            this.userService.setUserData(value.data.content);
            resolve({status: true, message: value.data.message});
          }else{ 
            this.authService.setIsLogged(false);
            this.userService.setUserData(null);
            resolve({status: false, message: value.data.message});
          }
        },
        error: (err: any) => {
          const errorMessage = err?.error?.data?.message || "An error occurred"; 
          this.authService.setIsLogged(false);
          this.userService.setUserData(null);
          reject({ status: false, message: errorMessage });
        }
      });
    });
  }

  async loginUserSesion(username: string, password: string, rememberMe: boolean) {
    return new Promise<{status: boolean, message: string}>((resolve, reject) => {
      this.authService.requestLogin(username, password, rememberMe).subscribe({
        next: (value) => {
          if(value.status == true){
            this.authService.setIsLogged(true);
            this.userService.setUserData(value.data.content);
            resolve({status: true, message: value.data.message});
          }else{
            this.authService.setIsLogged(false);
            this.userService.setUserData(null);
            resolve({status: false, message: value.data.message});
          }
        },
        error: (err: any) => {
          this.authService.setIsLogged(false);
          this.userService.setUserData(null);
          reject({status: false, message: err.error.data.message});
        }
      })
    });
    
  }


}
