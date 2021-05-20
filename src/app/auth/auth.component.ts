import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

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

    //Signs up a user if they are not currently in login mode and submit the form
    if (!this.isLoginMode) {
      this.authService.signup(email, password).subscribe(
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
    }

    //resets the form
    this.formData.reset();
  }
}
