import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{
  loginFromGroup: FormGroup|any;
  private authListenerSubs: Subscription|any;
  userIsAuthenticated = false;
  constructor(private authService: AuthService){}

ngOnInit(): void {
  this.userIsAuthenticated = this.authService.getIsAuth();
  this.loginFromGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required)
  });

  this.authListenerSubs = this.authService
    .getAuthStatusListener()
    .subscribe( isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
}

onSubmit(form: FormGroup)
  {
    console.log(form.value);
    if(form.invalid)
    {
      return;
    }
    this.authService.login(form.controls['email'].value, form.controls['password'].value);
  }

  onLogout()
  {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
  }
}
