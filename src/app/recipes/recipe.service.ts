import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [
    new Recipe(
      'Pasta Primavera',
      'A spring pasta dish.',
      'https://pixnio.com/free-images/2017/03/25/2017-03-25-09-34-43.jpg',
      [
        new Ingredient('pasta', 1),
        new Ingredient('cheese', 1),
        new Ingredient('spinach', 2),
      ]
    ),
    new Recipe(
      'Snickerdoodles',
      'Cinnamon sweet cookies.',
      'https://images.squarespace-cdn.com/content/v1/5ade3e0e89c172449f88ac65/1614124886357-MIH6ZYZGVXUCOATZDL4Z/ke17ZwdGBToddI8pDm48kO4Rzin9hdjjWyHGKsueu-J7gQa3H78H3Y0txjaiv_0fDoOvxcdMmMKkDsyUqMSsMWxHk725yiiHCCLfrh8O1z4YTzHvnKhyp6Da-NYroOW3ZGjoBKy3azqku80C789l0hHMyhIh2kKzuOL3ydJCryDQx51w8Xr20qkny1EoJYIDiHvzfsogRKyWSKFKWODDmQ/Walnut+Cookies.jpg?format=2500w',
      [
        new Ingredient('sugar', 1),
        new Ingredient('flour', 1),
        new Ingredient('cinnamon', 1),
        new Ingredient('butter', 2),
      ]
    ),
  ];

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Gets an exact copy of the Recipes stored in the service.
   * @returns an exact copy of the recipes array
   */
  getRecipes() {
    return this.recipes.slice();
  }

  /**
   * Retrieves a single recipe based on an id/index.
   * @param id The index the recipes array where the recipe resides
   * @returns the recipe with specified id
   */
  getRecipe(id: number) {
    return this.recipes[id];
  }

  /**
   * Adds a list of ingredients to the shopping list service.
   * @param ingredients list of ingredients to add to the shopping list
   */
  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  /**
   * Adds a recipe to the recipes list.
   * @param recipe the recipe to add
   */
  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Updates a recipe at a given index in the recipes array.
   * @param index the index to update
   * @param recipe the updated recipe
   */
  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  /**
   * Deletes a recipe from the recipes array based on a given index.
   * @param index the index of the recipe in the recipes array to delete
   */
  deleteRecipe(index: number) {
    this.recipes.splice(index);
    this.recipesChanged.next(this.recipes.slice());
  }
}
