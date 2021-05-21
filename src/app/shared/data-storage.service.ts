import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environmnets.dev';
import { Recipe } from '../recipes/recipe.model';
import { RecipeService } from '../recipes/recipe.service';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';

@Injectable({ providedIn: 'root' })
export class DataStorageService {
  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {}

  /**
   * Stores the recipes from the recipe service into the backend database and prints out the response text.
   */
  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put(environment.databaseURl, recipes).subscribe((response) => {
      console.log(response);
    });
  }

  /**
   * Retrieves an array of recipes from the backend database and sets the value to the recipes array stored in the recipeService.
   * @returns an Observable of a get http request.
   */
  fetchRecipes() {
    return this.http.get<Recipe[]>(environment.databaseURl).pipe(
      map((recipes) => {
        return recipes.map((recipe) => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : [],
          };
        });
      }),
      tap((recipes) => {
        this.recipeService.setRecipes(recipes);
      })
    );
  }
}
