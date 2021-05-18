import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('itemForm', { static: false }) form: NgForm;
  editMode = false;
  editedItemIndex: number;
  subscription: Subscription;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  /**
   * Set's up subscription to Shopping List started Editing. Set's form accordingly if in edit mode.
   */
  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        //sets edit mode values
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex
        );

        //sets form values if in edit mode
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  /**
   * When user submits for if in edit mode edits the selected ingredient. If in Add mode adds new ingredient based on form entry.
   */
  onSubmit() {
    //creates ingredient based on form input
    const newIngredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );

    if (this.form.valid) {
      //in edit mode updates selected ingredient
      if (this.editMode) {
        this.shoppingListService.updateIngredient(
          this.editedItemIndex,
          newIngredient
        );
      } else {
        //adds new ingredient
        this.shoppingListService.addIngredient(newIngredient);
      }

      //clears form
      this.onClearItem();
    }
  }

  /**
   * Clears the form and resets values set in edit mode.
   */
  onClearItem() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
    this.form.reset();
  }

  /**
   * Deletes selected ingredient item.
   */
  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearItem(); //clears form
  }

  /**
   * Cleans up subscriptions.
   */
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
