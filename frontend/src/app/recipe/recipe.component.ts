import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import { recipesLoader } from "../services/recipes-loader.service";
import { environment } from '../../environments/environment.development';

@Component({
  selector: 'app-recipe',
  standalone: true,
  imports: [],
  templateUrl: './recipe.component.html',
  styleUrl: './recipe.component.scss'
})
export class RecipeComponent {

  @Input()
  recipeId !: number;
  title ?: string;
  description ?: string;
  path = `${environment.apiUrl}/`;

  constructor(private http: HttpClient, private loader : recipesLoader) { }

  ngOnInit(): void {
    this.loader.recipeLoad(this.recipeId).subscribe((data: any) => {
      this.title = data.title;
      this.description = data.description;
      this.path += data.imagePath;
      this.path =this.path.replace(/\\/g, '/');
    });
  }

}
