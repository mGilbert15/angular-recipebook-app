import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  //Event emitter for selectedRecipe
  @Output() selectedRecipe = new EventEmitter<Recipe>();

  constructor(private recipeService: RecipeService) {}

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  /**
   * Emits recipe component was selected to parent component
   * @param recipe the recipe that was selected
   */
  onSelectedRecipeItem(recipe: Recipe) {
    this.selectedRecipe.emit(recipe);
  }
}
