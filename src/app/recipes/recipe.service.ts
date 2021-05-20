import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  private recipes: Recipe[] = [];

  constructor(private shoppingListService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
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
