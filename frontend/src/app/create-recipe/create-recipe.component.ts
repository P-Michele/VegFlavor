import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Recipe} from "../models/recipe";

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  recipe: Recipe = new Recipe();
  ingredient: string = '';
  quantity: number = 0;

  addIngredient() {
    if (this.ingredient && (this.quantity && this.quantity > 0)) {
      this.recipe.ingredients.push(this.ingredient);
      this.recipe.quantities.push(this.quantity);
      this.ingredient = '';
      this.quantity = 0;
    }
  }

  onSubmit(recipeForm: NgForm) {
  }
}
