import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  uploadProfileInfo(newName: string, newSurname: string, email:string): Observable<any> {
    // Replace 'your_backend_url' with the URL of your backend server
    const url = `${environment.apiUrl}/api/user/login`;
    const body = { name: newName, surname: newSurname };
    return this.http.put(url, body);
  }
}
