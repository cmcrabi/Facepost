import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Subscription } from "rxjs";
import { AuthService } from "../auth.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html'
})

export class RegisterComponent implements OnInit{
  registerFromGroup: FormGroup|any;
  userIsAuthenticated = false;
  private authListenerSubs: Subscription|any;
  constructor(private authService: AuthService){
  }

  ngOnInit(): void {
    console.log('register component');
    this.registerFromGroup = new FormGroup({
      email: new FormControl('',
      [Validators.required,
      Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
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
    console.log(form.controls['email'].value);
    this.authService.createUser(form.controls['email'].value, form.controls['password'].value);
  }
}
