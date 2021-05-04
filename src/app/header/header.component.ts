import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  //emit change dispaly event
  @Output() changeDisplay = new EventEmitter<string>();
  collapsed = true; //for hamburger
  constructor() {}

  ngOnInit(): void {}

  /**
   * Used to notify parent that the app view should be changed
   * @param view the view (recipes, or shopping list) that the app should be changed to
   */
  switchView(view: string) {
    this.changeDisplay.emit(view);
  }
}
