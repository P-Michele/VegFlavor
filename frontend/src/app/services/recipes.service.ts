import { Injectable } from '@angular/core';
import { Observable, catchError, map } from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';



@Injectable({
  providedIn: 'root'
})
export class RecipesService {


  constructor(private http: HttpClient) { }

  getRecipes(page: number, pageSize: number): Observable<{ recipes: Recipe[], totalPages: number }> {
    const url = `${environment.apiUrl}/api/recipes?page=${page}&pageSize=${pageSize}`;
    return this.http.get<any>(url);
  }
  /*getRecipes(): Observable<Recipe[]> {
    return this.http.get<Recipe[]>(this.recipesUrl);
  }*/
}
