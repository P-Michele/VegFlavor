import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private http: HttpClient,private auth:AuthService) { }

  getRecipes(page?: number): Observable<{ recipes: Recipe[], totalPages: number, page: number, pageSize: number, totalRecipes: number }> {
    let url = `${environment.apiUrl}/api/recipes`;
    if (page !== undefined) {
      url += `?page=${page}`;
    }
    return this.http.get<any>(url);
  }

  getAuthorRecipes(): Observable< Recipe[]> {
    const url = `${environment.apiUrl}/api/user/recipes`;
    return this.http.get<Recipe[]>(url);
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${environment.apiUrl}/api/recipes/${id}`;
    return this.http.get<Recipe>(url);
  }

  deleteRecipe(recipeId: number): Observable<any>{
    const url = `${environment.apiUrl}/api/recipes/${recipeId}`;
    return this.http.delete<any>(url);
  }

  canDelete(authorId : number){
    return this.auth.isAdmin() || this.auth.getCurrentUser()?.id == authorId;
  }

}
