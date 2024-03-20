import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import {RecipeComponent} from "../recipe/recipe.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RecipeComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  maxLength:number = 100;
  constructor() { }

  ngOnInit(): void {
      this.truncateDescription();
      
  }
  truncateDescription(): void {
    const descriptionElement = document.querySelector('.description');
    if (descriptionElement && descriptionElement.textContent) {
      let text = descriptionElement.textContent.trim();
      if (text.length > this.maxLength) {
        text = text.slice(0, this.maxLength) + '...';
        descriptionElement.textContent = text;
      }
    }
  }
}

