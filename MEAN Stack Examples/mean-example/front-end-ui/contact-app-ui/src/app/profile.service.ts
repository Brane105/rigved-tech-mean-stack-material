import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  baseURL = "http://localhost:3001/profile"
  constructor(private _http: HttpClient) { }

  // register profile
  public storeProfile(profile: any) : Observable<any> {
    return this._http.post(this.baseURL, profile);
  }
  // login 
  public login(id: number, password: string) : Observable<any> {
    let url = `${this.baseURL}/${id}/${password}`;
    return this._http.get(url);
  }
  //add contacts
  public addContact(id: number, contact: any): Observable<any> { 
    let url = `${this.baseURL}/${id}/addContact`;
    return this._http.put(url, contact);
  }
  //show all contacts
  public showContacts(id: number) : Observable<any>{
    let url = `${this.baseURL}/${id}/c/c`;
    return this._http.get(url);
  }
  //get profile
  public getProfile(id : number) : Observable<any> {
    let url = `${this.baseURL}/${id}`;
    return this._http.get(url);
  }
}
