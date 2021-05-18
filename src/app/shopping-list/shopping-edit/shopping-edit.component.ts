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

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (id: number) => {
        this.editMode = true;
        this.editedItemIndex = id;
        this.editedItem = this.shoppingListService.getIngredient(
          this.editedItemIndex
        );

        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    const newIngredient = new Ingredient(
      this.form.value.name,
      this.form.value.amount
    );

    if (this.form.valid) {
      if (this.editMode) {
        this.shoppingListService.updateIngredient(
          this.editedItemIndex,
          newIngredient
        );
      } else {
        this.shoppingListService.addIngredient(newIngredient);
      }

      this.onClearItem();
    }
  }

  onClearItem() {
    this.editMode = false;
    this.editedItemIndex = null;
    this.editedItem = null;
    this.form.reset();
  }

  onDeleteItem() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClearItem();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
