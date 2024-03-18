import { Component } from '@angular/core';
import {FormsModule, NgForm} from '@angular/forms';
import {Recipe} from "../models/recipe";
import { RecipesService } from '../services/recipes.service';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [
    FormsModule,RouterLink,CommonModule
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {

  constructor(private recipesService:RecipesService) {}

  recipe: Recipe = new Recipe();
  ingredient: string = '';
  quantity: number = 0;

  /*addIngredient() {
    if (this.ingredient && (this.quantity && this.quantity > 0)) {
      this.recipe.ingredients.push(this.ingredient);
      this.recipe.quantities.push(this.quantity);
      this.ingredient = '';
      this.quantity = 0;
    }
  }*/

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1); 
    //this.recipe.quantities.splice(index, 1); 
  }

 onSubmit(recipeForm: NgForm) {}

}
