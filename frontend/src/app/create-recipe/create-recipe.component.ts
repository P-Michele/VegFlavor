import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Recipe} from "../models/recipe";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { environment } from '../../environments/environment.development';

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

  constructor(private http:HttpClient) {}

  addIngredient() {
    if (this.ingredient && (this.quantity && this.quantity > 0)) {
      const newIngredient = { name: this.ingredient, quantity: this.quantity };
      this.recipe.ingredients.push(newIngredient);
      this.ingredient = '';
      this.quantity = 0;
    }
  }

  selectFile(event: any): void {
    this.recipe.selectedFile = event.target.files.item(0);
  }


  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

 onSubmit() {
    let formData = new FormData();
    formData.append("image", this.recipe.selectedFile);
    formData.append("recipeData" ,JSON.stringify(this.recipe));

     console.log(formData,this.recipe);
     console.log(this.http.post(`${environment.apiUrl}/api/recipes`, formData).subscribe());
 }

}
