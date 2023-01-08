import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { IAuthData } from "./IAuthData";

@Injectable({
  providedIn: 'root'
})

export class AuthService{
  private token :string | any;
  private tokenTimer: NodeJS.Timer|any;
  private authStatusListener = new Subject<boolean>();
  private isAuthenticated = false;

  constructor(private http:HttpClient, private router:Router){}

  login(email: string, password: String){
    const authData: IAuthData = { email: email, password: password};
    this.http.post<{token: string, expiresIn: number}>("http://localhost:3000/api/login", authData)
    .subscribe(response=>{
      this.token = response.token;
      if(response.token)
      {
        this.isAuthenticated = true;
        const expiresInDuration = response.expiresIn;
        this.setAuthTimer(expiresInDuration);
        this.authStatusListener.next(true);
        const now = new Date();
        const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
        this.saveAuthData(this.token, expirationDate);
        console.log(expirationDate);
        console.log(this.token);
        this.router.navigate(['/']);
      }
    })
  }

  createUser(email: String, password: String){
    const authData: IAuthData = { email: email, password: password};
    this.http.post("http://localhost:3000/api/signup", authData)
    .subscribe(response => {
      console.log(response);
    });
  }

  autoLogin()
  {
    const authInformation = this.getAuthData();
    if(!authInformation)
    {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if(expiresIn > 0)
    {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);

    }
  }

  private setAuthTimer(duration: number)
  {
    console.log('setting timer: ' + duration);
    setTimeout(()=>{
      this.logout();
    }, duration * 1000);
  }

  getAuthData()
  {
    const token = localStorage.getItem('token');
    const expiration = localStorage.getItem('expiration');
    if(!token || !expiration)
    {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expiration)
    };
  }

  logout()
  {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
  }

  getIsAuth(){
    return this.isAuthenticated;
  }

  getToken()
  {
    return this.token;
  }

  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
   }

   saveAuthData(token: string, expirationDate: Date)
   {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
   }

   clearAuthData()
   {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
   }

}
