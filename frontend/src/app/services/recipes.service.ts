import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient) { }

  getRecipes(page: number, pageSize: number): Observable<{ recipes: Recipe[], totalPages: number,page:number,pageSize:number }> {
    const url = `${environment.apiUrl}/api/recipes?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  
  getRecipe(id: number): Observable<Recipe> {
    const url = `${environment.apiUrl}/api/recipes/${id}`;
    return this.http.get<Recipe>(url);
  }
}
