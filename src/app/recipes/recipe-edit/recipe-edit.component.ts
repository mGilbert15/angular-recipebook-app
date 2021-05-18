import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ) {}

  /**
   * Subscribes to router parameters.
   */
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm();
    });
  }

  /**
   * Creates an initial form value based on if in editMode or add mode.
   */
  private initForm() {
    //default values (used for add mode)
    let recipeName: String = '';
    let recipeImagePath: String = '';
    let recipeDescription: String = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      //loads ingredients
      if (recipe['ingredients']) {
        for (let ingredient of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(ingredient.name, Validators.required),
              amount: new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        }
      }
    }

    //creates new recipe form
    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients,
    });
  }

  /**
   * Get's the form's ingredient form array controls.
   * @returns the ingredients form array controls
   */
  getIngredientControl() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  /**
   * Submits form adds recipe if in add mode and updates a recipe if in edit mode. Navigates back to recipe home.
   */
  onSubmit() {
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.navigateToRecipesHome();
  }

  /**
   * Navigates user back to recipes home and resets edit mode variables.
   */
  navigateToRecipesHome() {
    this.editMode = false;
    this.id = null;
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  /**
   * Adds a new empty ingredient to the ingredients portion of recipe forms.
   */
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  }

  /**
   * Navigates back to recipe home.
   */
  onCancel() {
    this.navigateToRecipesHome();
  }

  /**
   * Removes an ingredient based on given index.
   * @param index index to remove ingredient
   */
  deleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }
}
