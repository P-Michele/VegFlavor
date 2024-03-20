import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import {RecipesService} from "../services/recipes.service";
import {RouterLink} from "@angular/router";
import { catchError } from 'rxjs';

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
  path = `${environment.apiUrl}/uploads/`;

  constructor(private loader : RecipesService) { }

  ngOnInit(): void {
    this.loader.getRecipe(this.recipeId).subscribe((data: any) => {
      this.title = data.title;
      this.description = data.description;
      this.path += data.imageName;
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
