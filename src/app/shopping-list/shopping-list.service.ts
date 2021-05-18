import { Subject } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>(); //subject emitted when ingredients changed
  startedEditing = new Subject<Number>(); //subject that keeps track of editing
  //initial list of ingrdients
  private ingredients = [
    new Ingredient('Tomatoes', 2),
    new Ingredient('Lettece', 1),
  ];

  /**
   * Get's list of all ingredients in Shopping List Service.
   * @returns a list of ingredients
   */
  getIngredients() {
    return this.ingredients.slice();
  }

  /**
   * Retrieves the ingredient stores at the given index.
   * @param index the index of the ingredient in the ingredients list
   * @returns the ingredient stored at given index.
   */
  getIngredient(index: number) {
    return this.ingredients[index];
  }

  /**
   * Adds an ingredient to the ingredients list.
   * @param ingredient the ingredient to add to the ingredient list
   */
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.getIngredients());
  }

  /**
   * Adds multiple ingredients to the end of the ingredient list.
   * @param ingredients list of ingredients to add to the ingredient list.
   */
  addIngredients(ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

  /**
   * Deletes an ingredient at a given index.
   * @param index the index of the ingredient to be deleted
   */
  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  /**
   * Updates the ingredient at a given index.
   * @param index the index of the ingredient to update
   * @param ingredient the new ingredient value to replace old ingredient with
   */
  updateIngredient(index: number, ingredient: Ingredient) {
    this.ingredients[index] = ingredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
