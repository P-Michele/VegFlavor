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
    FormsModule, RouterLink, CommonModule
  ],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})

export class CreateRecipeComponent {

  recipe: Recipe = new Recipe();
  ingredient: string = '';
  quantity !: number;

  constructor(private recipesService:RecipesService) {}

  addIngredient() {
    if (this.ingredient && (this.quantity && this.quantity > 0)) {
      const newIngredient = { name: this.ingredient, quantity: this.quantity };
      this.recipe.ingredients.push(newIngredient);
      this.ingredient = '';
      this.quantity = 0;
    }
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

 onSubmit() {
    let formData = new FormData();
    formData.set("recipe" ,JSON.stringify(this.recipe));
    console.log(formData);
 }

}
