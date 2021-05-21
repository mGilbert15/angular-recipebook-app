import { Component, OnInit } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'angular-recipebook-app';
  display = 'recipes';

  constructor(private authService: AuthService) {}

  /**
   * Logs user in if token is still valid.
   */
  ngOnInit() {
    this.authService.autoLogin();
  }
}
