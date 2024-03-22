import {Component, OnInit} from '@angular/core';
import {RouterLink} from '@angular/router';
import {RecipeComponent} from "../recipe/recipe.component";
import {Recipe} from "../models/recipe";
import {RecipesService} from "../services/recipes.service";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RecipeComponent, NgForOf],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  recipes: Recipe[] = [];
  maxLength:number = 100;
  constructor(private loader : RecipesService) {}

  ngOnInit(): void {
    this.loader.getRecipes().subscribe(
      (data) => {
        data.recipes.forEach((recipe: Recipe) => {
          this.recipes.push(recipe);
        });
        this.truncateDescription();
      }
    );
  }


  truncateDescription(): void {
    const descriptionElements = document.querySelectorAll('.description');
    descriptionElements.forEach((descriptionElement) => {
      const text = descriptionElement.textContent?.trim();
      if (text && text.length > this.maxLength) {
        descriptionElement.textContent = text.slice(0, this.maxLength) + '...';
      }
    });
  }


}

