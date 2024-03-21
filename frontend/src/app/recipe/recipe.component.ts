import {Component, Input} from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {RouterLink} from "@angular/router";
import { catchError } from 'rxjs';
import {Recipe} from "../models/recipe";
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input()
  recipeId !: number;
  title ?: string;
  description ?: string;
  path : string | undefined;

  constructor(private loader : RecipesService) { }

  ngOnInit(): void {
    this.loader.getRecipe(this.recipeId).subscribe((recipe: Recipe) => {
      this.title = recipe.title;
      this.description = recipe.description;
      this.path = `${environment.apiUrl}/uploads/` + recipe.imageName;
    });
  }

  deleteRecipe(): void {
    this.loader.deleteRecipe(this.recipeId)
      .pipe(
        catchError(error => {
          console.error("Errore durante l'eliminazione della ricetta:", error);
          throw error;
        })
      )
      .subscribe(() => {
        console.log("Ricetta eliminata con successo");
      });
  }

}
