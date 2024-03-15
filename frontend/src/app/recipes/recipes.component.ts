import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { Recipe } from '../models/recipe';
import { RecipeService } from '../services/recipe.service';
import { discardPeriodicTasks } from '@angular/core/testing';

@Component({
  selector: 'app-recipes',
  standalone: true,
  imports: [],
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
    }
  ];
  currentPage: number = 1;
  pageSize: number = 2;

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
    //this.recipes = this.recipes.slice(start, end);

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
              `;
        recipeList.appendChild(listItem);
      });

      const pageNumber = document.getElementById('div');
      if (pageNumber) {
        pageNumber.style.textAlign = 'center';
        pageNumber.innerHTML = `Page: ${this.currentPage}`;
      }
  }
}
}
