import { Component } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  collapsed = true; //for hamburger

  constructor(private dataStorageService: DataStorageService) {}

  /**
   * Stores recipes in database.
   */
  onSaveData() {
    this.dataStorageService.storeRecipes();
  }

  /**
   * Retrieves recipes from database and listens to changes.
   */
  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
  }
}
