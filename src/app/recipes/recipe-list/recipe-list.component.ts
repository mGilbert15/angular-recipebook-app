import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  /**
   * Get's all of the recipes and subscibes to any changes in recipes array.
   */
  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();

    this.recipeService.recipesChanged.subscribe((updatedRecipes) => {
      this.recipes = updatedRecipes;
    });
  }

  /**
   * Navigates to add new recipe route.
   */
  onClickNewRecipe() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
