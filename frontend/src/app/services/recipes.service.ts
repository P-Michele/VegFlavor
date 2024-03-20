import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { Recipe } from '../models/recipe';
import { HttpClient} from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { AuthService } from './auth.service';
import { ErrorHandlerService } from './error-handler.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(private router:Router ,private http: HttpClient,private authService:AuthService,private errorHandlerService: ErrorHandlerService) { }

  getRecipes(page: number): Observable<{ recipes: Recipe[], totalPages: number,page:number,pageSize:number,totalRecipes:number }> {
    const url = `${environment.apiUrl}/api/recipes?page=${page}`;
    return this.http.get<any>(url);
  }

  getRecipe(id: number): Observable<Recipe> {
    const url = `${environment.apiUrl}/api/recipes/${id}`;
    return this.http.get<Recipe>(url);
  }

}
