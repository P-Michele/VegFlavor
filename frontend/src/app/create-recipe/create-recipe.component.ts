import { Component } from '@angular/core';
import {FormsModule} from '@angular/forms';
import {Recipe} from "../models/recipe";
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import {HttpClient} from "@angular/common/http";
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

  recipe: Recipe;
  ingredient: string = '';
  quantity !: number;
  file !: File;

  constructor(private http:HttpClient) {
    this.recipe = new Recipe();
  }

  addIngredient() {
    if (this.ingredient && (this.quantity && this.quantity > 0)) {
      const newIngredient = { name: this.ingredient, quantity: this.quantity };
      this.recipe.ingredients.push(newIngredient);
      this.ingredient = '';
      this.quantity = 0;
    }
  }

  selectFile(event: any): void {
    const file = event.target.files.item(0);
    if (file && file.type.match('image/png')){
      const fileNameDisplay = document.getElementById('fileNameDisplay');
      this.file = file;
      if (fileNameDisplay) {
        fileNameDisplay.textContent = file.name;
      }
    }else{
      alert('formato invalido, si accettano solo file .png');
    }

    const imagePreview = document.getElementById('imagePreview') as HTMLImageElement;
    if (imagePreview && file.type.startsWith('image')) {
      imagePreview.style.display = 'block';
      const reader = new FileReader();
      reader.onload = (e: any) => {
        imagePreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  removeIngredient(index: number) {
    this.recipe.ingredients.splice(index, 1);
  }

 onSubmit() {
    let formData = new FormData();
    formData.append("image", this.file);
    formData.append("recipeData" ,JSON.stringify(this.recipe));
    this.http.post(`${environment.apiUrl}/api/recipes`, formData).subscribe(() => {
      // Clear input fields and labels after successful HTTP request
      this.recipe = new Recipe();
      this.ingredient = '';
      this.quantity = 0;
      this.clearInputImage();
      this.clearImagePreview();
    });
 }

 clearInputImage() {
    // Clear the selected image
    const inputElement: HTMLInputElement = document.getElementById('fileNameDisplay') as HTMLInputElement;
    if (inputElement) {
      inputElement.textContent = ''; // Clear the input value
    }
 }
 clearImagePreview() {
  const imagePreview: HTMLImageElement = document.getElementById('imagePreview') as HTMLImageElement;
  if (imagePreview) {
    imagePreview.src = ''; // Clear the image source
    imagePreview.style.display = 'none'; // Hide the image preview
  }
 }

}
