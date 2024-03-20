import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { environment } from '../../environments/environment.development';
import {RecipesService} from "../services/recipes.service";
import {RouterLink} from "@angular/router";

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
  path = `${environment.apiUrl}/`;

  constructor(private http: HttpClient, private loader : RecipesService) { }

  ngOnInit(): void {
    this.loader.getRecipe(this.recipeId).subscribe((data: any) => {
      this.title = data.title;
      this.description = data.description;
      this.path += data.imagePath;
      this.path =this.path.replace(/\\/g, '/');
    });
  }

}
