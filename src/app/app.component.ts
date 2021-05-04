import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'angular-recipebook-app';
  display = 'recipes';

  /**
   * Event listener for navigation component changeDisplay event.
   * @param view the view the app should show
   */
  onChangeDisplay(view) {
    this.display = view;
  }
}
