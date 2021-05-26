import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthResponseData, AuthService } from './auth.service';
import { AlertComponent } from '../shared/alert/alert.component';
import { Placeholder } from '@angular/compiler/src/i18n/i18n_ast';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;
  formData: FormGroup;
  @ViewChild(PlaceholderDirective, { static: false })
  alertHost: PlaceholderDirective;
  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  /**
   * Creates form group for form data.
   */
  ngOnInit() {
    this.formData = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
    });
  }

  /**
   * Switch between login mode and create a new user mode.
   */
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  /**
   * Handles the close alert component event. Handles error by setting it to null.
   */
  onHandleError() {
    this.error = null;
  }

  /**
   * Show the alert message component programmatically.
   * @param message the error message
   */
  private showErrorAlert(message: string) {
    const alertCmpFactory =
      this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear();

    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }

  /**
   * Handles submitting the data.
   * @returns
   */
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
        this.router.navigate(['/recipes']);
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);
        this.isLoading = false;
      }
    );

    //resets the form
    this.formData.reset();
  }

  /**
   * Unsubscribes from any open subscriptions.
   */
  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
