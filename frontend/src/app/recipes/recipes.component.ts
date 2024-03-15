import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { discardPeriodicTasks } from '@angular/core/testing';
import { NgFor, NgIf } from '@angular/common';


@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.scss',
  template: `
  <h2>{{ recipe.title }}</h2>
  <p>{{ recipe.description }}</p>
  <p>Prep Time: {{ recipe.prepTime }} minutes</p>
  <p>Cook Time: {{ recipe.cookTime }} minutes</p>
  <p>Serving Size: {{ recipe.servingSize }}</p>
  <h3>Ingredients</h3>
  <p>{{ recipe.ingredients }}</p>
  <h3>Instructions</h3>
  <p>{{ recipe.instructions }}</p>
`
})
export class RecipesComponent implements OnInit {

  recipes: Recipe[] = [
    {
      id: 1,
      title: 'Spaghetti',
      description: 'A classic Italian dish',
      instructions: 'Boil water, add pasta, cook for 10 minutes, drain, add sauce',
      ingredients: 'Pasta, sauce',
      prepTime: 5,
      cookTime: 10,
      servingSize: 4
    },
    {
      id: 2,
      title: 'Tacos',
      description: 'A classic Mexican dish',
      instructions: 'Cook meat, add to tortilla, add toppings',
      ingredients: 'Tortillas, meat, toppings',
      prepTime: 10,
      cookTime: 15,
      servingSize: 4
    },
    {
      id: 3,
      title: 'Pizza',
      description: 'A classic Italian dish',
      instructions: 'Make dough, add sauce and toppings, bake',
      ingredients: 'Dough, sauce, toppings',
      prepTime: 20,
      cookTime: 15,
      servingSize: 8
    },
    {
      id: 4,
      title: 'Hamburger',
      description: 'A classic American dish',
      instructions: 'Cook meat, add to bun, add toppings',
      ingredients: 'Bun, meat, toppings',
      prepTime: 10,
      cookTime: 10,
      servingSize: 4
    },
    {
      id: 5,
      title: 'Chicken Alfredo',
      description: 'A classic Italian dish',
      instructions: 'Cook chicken, make sauce, add to pasta',
      ingredients: 'Pasta, chicken, sauce',
      prepTime: 15,
      cookTime: 20,
      servingSize: 4
    },
    {
      id: 6,
      title: 'Chicken Fried Rice',
      description: 'A classic Chinese dish',
      instructions: 'Cook chicken, cook rice, add to pan, add veggies',
      ingredients: 'Rice, chicken, veggies',
      prepTime: 15,
      cookTime: 20,
      servingSize: 4
    },
    {
      id: 7,
      title: 'Chicken Tacos',
      description: 'A classic Mexican dish',
      instructions: 'Cook chicken, add to tortilla, add toppings',
      ingredients: 'Tortillas, chicken, toppings',
      prepTime: 10,
      cookTime: 15,
      servingSize: 4
    },
    {
      id: 8,
      title: 'Chicken Parmesan',
      description: 'A classic Italian dish',
      instructions: 'Cook chicken, add sauce, bake',
      ingredients: 'Chicken, sauce',
      prepTime: 15,
      cookTime: 20,
      servingSize: 4
    },
    {
      id: 9,
      title: 'Chicken Noodle Soup',
      description: 'A classic American dish',
      instructions: 'Cook chicken, make broth, add noodles',
      ingredients: 'Chicken, broth, noodles',
      prepTime: 15,
      cookTime: 20,
      servingSize: 4
    },
    {
      id: 10,
      title: 'Chicken and Rice',
      description: 'A classic American dish',
      instructions: 'Cook chicken, cook rice, add to pan, add veggies',
      ingredients: 'Rice, chicken, veggies',
      prepTime: 15,
      cookTime: 20,
      servingSize: 4
    },
  ]; // Array of recipes from database
  pagedRecipes: Recipe[] = []; // Recipes to display on the current page
  currentPage: number = 1;
  pageSize: number = 2;
  Array: any;

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.updateDisplayRecipes();
  }
  nextPage(): void {
    if (this.currentPage * this.pageSize < this.recipes.length) {
      this.currentPage++;
      this.updateDisplayRecipes();
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayRecipes();
    }
  }
  updateDisplayRecipes(): void {
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    const displayRecipes = this.recipes.slice(start, end);
    this.pagedRecipes = displayRecipes;

    const recipeList = document.getElementById('recipe-list');
    if (recipeList) { // check that recipeList is not null
      recipeList.innerHTML = ''; // clear the list

      displayRecipes.forEach((recipe) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
                <strong>${recipe.title}</strong>: ${recipe.description}<br>
                Instructions: ${recipe.instructions}<br>
                Ingredients: ${recipe.ingredients}<br>
                Prep Time: ${recipe.prepTime} minutes<br>
                Cook Time: ${recipe.cookTime} minutes<br>
                Serving Size: ${recipe.servingSize}<br>
                <br>
              `;
        recipeList.appendChild(listItem);
      });

      const pagination = document.getElementById('pagination');
      if (pagination) {
        pagination.innerHTML = ''; // clear pagination

        // Add previous button
        if (this.currentPage > 1) {
          const previousButton = document.createElement('button');
          previousButton.textContent = 'Previous';
          previousButton.onclick = () => {
            this.prevPage();
          };
          pagination.appendChild(previousButton);
        }

        // Add page numbers
        for (let i = 1; i <= this.totalPages(); i++) {
          const pageNumberButton = document.createElement('button');
          pageNumberButton.textContent = i.toString();
          pageNumberButton.onclick = () => {
            this.goToPage(i);
          };
          if (i === this.currentPage) {
            pageNumberButton.classList.add('active');
          }
          pagination.appendChild(pageNumberButton);
        }

        // Add next button
        if (this.currentPage < this.totalPages()) {
          const nextButton = document.createElement('button');
          nextButton.textContent = 'Prossimo';
          nextButton.onclick = () => {
            this.nextPage();
          };
          pagination.appendChild(nextButton);
        }
      }
    }
  }
  goToPage(pageNumber: number): void {
    if (pageNumber >= 1 && pageNumber <= this.totalPages()) {
      this.currentPage = pageNumber;
      this.updateDisplayRecipes();
    }
  }

  totalPages(): number {
    return Math.ceil(this.recipes.length / this.pageSize);
  }
  pageNumbers(): (number | string)[] {
    const totalPages = this.totalPages();
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
