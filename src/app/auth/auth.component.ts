import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  formData: FormGroup;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    if (!this.formData.valid) {
      return;
    }

    //retrieves email and password values form form
    const email = this.formData.value.email;
    const password = this.formData.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    //Sets Auth observal value based on mode
    if (!this.isLoginMode) {
      authObs = this.authService.signup(email, password);
    } else {
      authObs = this.authService.login(email, password);
    }

    //Subscribes and handles response from auth call
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    //resets the form
    this.formData.reset();
  }
}
