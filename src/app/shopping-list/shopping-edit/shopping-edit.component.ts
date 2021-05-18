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

  onAddItem() {
    if (this.form.valid) {
      this.shoppingListService.addIngredient(
        new Ingredient(this.form.value.name, this.form.value.amount)
      );
      this.form.reset();
    }
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
