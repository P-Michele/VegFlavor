import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipesService } from '../services/recipes.service';
import { CommonModule} from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { Observable} from 'rxjs';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss'
})
export class RecipesComponent implements OnInit {

  currentPage!: number ;
  pageSize!: number;
  recipes$!: Observable<{ recipes: Recipe[], totalPages: number,page:number,pageSize:number }>;
  totalPages!:number;
  recipe!: Recipe;

  constructor(private recipesService: RecipesService,private router:Router) { }

  ngOnInit(): void {
    this.getRecipes(this.currentPage);
  }

  getRecipes(currentPage: number): void {
    this.recipes$ = this.recipesService.getRecipes(currentPage);
    this.recipes$.subscribe(data => {
      this.totalPages = data.totalPages;
      this.currentPage=data.page;
      this.pageSize=data.pageSize;
    });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getRecipes(this.currentPage);
      this.router.navigate(['/recipes'], { queryParams: { page: this.currentPage} });
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getRecipes(this.currentPage);
      this.router.navigate(['/recipes'], { queryParams: { page: this.currentPage} });
    }
  }

  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages) {
      this.currentPage = pageNumber;
      this.getRecipes(this.currentPage);
      this.router.navigate(['/recipes'], { queryParams: { page: this.currentPage } });
    }
  }

  getTotalPages(): number {
    return this.totalPages;
  }

  pageNumbers(): (number | string)[] {
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;
    const pagesToShow = 9; // Number of pages to show without ellipsis

    // If there are less than 'pagesToShow' pages, show all pages
    if (totalPages <= pagesToShow) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    let startPage: number;
    let endPage: number;

    // Calculate startPage and endPage based on the current page
    if (currentPage <= Math.ceil(pagesToShow / 2)) {
      // Display pages from 1 to pagesToShow
      startPage = 1;
      endPage = pagesToShow;
    } else if (currentPage + Math.floor(pagesToShow / 2) >= totalPages) {
      // Display last 'pagesToShow' pages
      startPage = totalPages - pagesToShow + 1;
      endPage = totalPages;
    } else {
      // Display pages around the current page
      startPage = currentPage - Math.floor(pagesToShow / 2);
      endPage = currentPage + Math.floor(pagesToShow / 2);
    }

    const pages = Array.from({ length: endPage - startPage + 1 }, (_, index) => index + startPage);

    // Add ellipsis and first/last page if necessary
    const result = [];
    if (startPage > 1) {
      result.push(1);
      if (startPage > 2) {
        result.push('...');
      }
    }
    result.push(...pages);
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        result.push('...');
      }
      result.push(totalPages);
    }

    return result;
  }

}
