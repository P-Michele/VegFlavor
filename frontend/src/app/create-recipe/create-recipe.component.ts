import { Component } from '@angular/core';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';

@Component({
  selector: 'app-create-recipe',
  standalone: true,
  imports: [],
  templateUrl: './create-recipe.component.html',
  styleUrl: './create-recipe.component.scss'
})
export class CreateRecipeComponent {
  constructor(private recipeService: RecipesService) { 
  }
}
