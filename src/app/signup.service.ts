// signup.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Tata{
  id:number;
  UserName : string;
  User_Email : string;
  User_Password : string;
  confirmpassword : string ; 
}

@Injectable({
  providedIn: 'root'
})
export class SignupService {
  
  private apiUrl = 'https://localhost:7299/api/signups'; 

  constructor(private http: HttpClient) {}
     
  postItem(tata : Tata): Observable<Tata>
  {
    return this.http.post<Tata>(`${this.apiUrl}`, tata);
  }

loginUser(User_Email: string, User_Password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/login`, { User_Email, User_Password });
  }
 
  } 

