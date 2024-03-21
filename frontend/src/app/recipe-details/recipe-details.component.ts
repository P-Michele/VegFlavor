import {Component, Input} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { CommonModule } from '@angular/common';
import {Recipe} from "../models/recipe";
import {Subscription, throwError} from "rxjs";
import {environment} from "../../environments/environment.development";
import {catchError} from "rxjs/operators";

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})

export class RecipeDetailsComponent {

  recipe : Recipe;
  path : string | undefined;
  private routeSub !: Subscription;
  protected error: string | undefined;

  constructor(private recipesService:RecipesService,private route: ActivatedRoute) {
    this.recipe = new Recipe();
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      this.recipesService.getRecipe(params['id']).pipe(
        catchError(error => {
          this.error = 'Ricetta inesistente';
          return throwError(error); // Rethrow the error
        })
      ).subscribe((recipe: any) => {
        this.recipe = recipe;
        this.path = `${environment.apiUrl}/uploads/` + recipe.imageName;
      });
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}



