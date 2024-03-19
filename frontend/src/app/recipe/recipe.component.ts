import {Component, Input} from '@angular/core';
import {HttpClient} from "@angular/common/http";
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
  recipeId?: number;
  title ?: string;
  description ?: string;
  src = `${environment.apiUrl}`;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get<any>(`${environment.apiUrl}/api/recipes/${this.recipeId}`).subscribe(data => {
     this.title = data.title;
     this.description = data.description;
     this.src += data.imagePath;
    });
  }

}
