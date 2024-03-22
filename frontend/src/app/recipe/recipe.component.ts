import {Component, Input, OnInit} from '@angular/core';
import {RecipesService} from "../services/recipes.service";
import {RouterLink} from "@angular/router";
import {Recipe} from "../models/recipe";
import {environment} from "../../environments/environment.development";
import {NgIf} from "@angular/common";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [
    RouterLink,
    NgIf
  ],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent implements OnInit{

  @Input()
  recipe !: Recipe;
  path !: string;

  constructor(private loader : RecipesService) {}

  deleteRecipe(): void {
    this.loader.deleteRecipe(this.recipe.id)
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

  ngOnInit(): void {
    this.path = `${environment.apiUrl}/uploads/` + this.recipe.imageName;
  }

}
