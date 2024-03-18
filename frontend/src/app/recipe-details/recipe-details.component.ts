import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../models/recipe';
import { Observable, catchError} from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-recipe-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-details.component.html',
  styleUrl: './recipe-details.component.scss'
})

export class RecipeDetailsComponent {
  idRicetta!: number;
  currentPage!:number;
  pageSize!:number;
  recipe$!:Observable<Recipe>;
  error: any;

  constructor(private recipesService:RecipesService,private route: ActivatedRoute,private router:Router) {}

  ngOnInit(): void {
    // l'ID della ricetta dall'URL
    const recipeId = this.route.snapshot.params['id'];
    // Chiama il metodo del servizio per ottenere i dettagli della ricetta
    this.recipe$ = this.recipesService.getRecipe(recipeId)
    .pipe(
      catchError((error: any) => {
        this.error = error.message || 'Internal server error';
        return [];
      })
    );
  }

  goToFirstPage(): void {
    this.router.navigate(['/recipes']);
  }
}
 
  

