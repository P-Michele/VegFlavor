import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment.development";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class recipesLoader {

  constructor(private http: HttpClient) { }

  recipeLoad(recipeId:number){
    return this.http.get<any>(`${environment.apiUrl}/api/recipes/${recipeId}`);
  }
}
