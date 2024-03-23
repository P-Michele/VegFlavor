import { Component } from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {Recipe} from "../models/recipe";
import {RecipeComponent} from "../recipe/recipe.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-my-recipes',
  standalone: true,
  imports: [
    RecipeComponent,
    NgForOf
  ],
  templateUrl: './my-recipes.component.html',
  styleUrl: './my-recipes.component.scss'
})
export class MyRecipesComponent {

  recipes: Recipe[] = [];

  constructor(private loader : RecipesService) {
  }

  ngOnInit(): void {
    this.loader.getAuthorRecipes().subscribe(
      (data) => {
        data.forEach((recipe: Recipe) => {
          this.recipes.push(recipe);
        });
      }
    );
  }

  onDeleteRecipe(recipeId: number): void {
    this.recipes = this.recipes.filter(recipe => recipe.id !== recipeId);
  }

}
