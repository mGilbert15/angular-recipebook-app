import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Pasta Primavera',
      'A spring pasta dish.',
      'https://pixnio.com/free-images/2017/03/25/2017-03-25-09-34-43.jpg'
    ),
    new Recipe(
      'Snickerdoodles',
      'Cinnamon sweet cookies.',
      'https://images.squarespace-cdn.com/content/v1/5ade3e0e89c172449f88ac65/1614124886357-MIH6ZYZGVXUCOATZDL4Z/ke17ZwdGBToddI8pDm48kO4Rzin9hdjjWyHGKsueu-J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hHMyhIh2kKzuOL3ydJCryDQx51w8Xr20qkny1EoJYIDiHvzfsogRKyWSKFKWODDmQ/Walnut+Cookies.jpg?format=2500w'
    ),
  ];

  //Event emitter for selectedRecipe
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor() {}

  ngOnInit(): void {}

  /**
   * Emits recipe component was selected to parent component
   * @param recipe the recipe that was selected
   */
  onSelectedRecipeItem(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
