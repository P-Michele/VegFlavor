import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipesService } from '../services/recipes.service';
import { CommonModule} from '@angular/common';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import {Observable, throwError} from 'rxjs';
import { RecipeComponent } from "../recipe/recipe.component";
import {catchError} from "rxjs/operators";
import { PaginatorComponent } from '../paginator/paginator.component';


@Component({
    selector: 'app-recipes',
    standalone: true,
    templateUrl: './recipes.component.html',
    styleUrl: './recipes.component.scss',
    imports: [CommonModule, RouterLink, RecipeComponent,PaginatorComponent]
})
export class RecipesComponent implements OnInit {

  pageSize!: number;
  recipes$!: Observable<{ recipes: Recipe[], totalPages: number,page:number,pageSize:number,totalRecipes:number }>;
  totalPages!:number;
  //recipe!: Recipe;
  currentPage!: number;

  constructor(
    private recipesService: RecipesService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
      // prende i parametri dall'url
      const params = this.activatedRoute.snapshot.queryParams;
      //controlla se esistono e se uno si riferisce a page
    const page = (params['page']);
    this.getRecipes(page);

  }

  getRecipes(currentPage : number): void {
    this.recipes$ = this.recipesService.getRecipes(currentPage).pipe(
      catchError(error => {
          // Effettua il redirect al percorso /404
          this.router.navigate(['/404']);
        return throwError(() => error);
      })
    );
    this.recipes$.subscribe((data: any) => {
      this.totalPages = data.totalPages;
      this.currentPage=data.page;
      this.pageSize=data.pageSize;
    });
  }

  onPageChange(pageNumber: number): void {
    this.getRecipes(pageNumber);
    this.router.navigate(['/recipes'], { queryParams: { page: pageNumber} });
  }
}
