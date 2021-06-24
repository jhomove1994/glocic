import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private http: HttpClient) { }

  getContactos() {
    return this.http.get("assets/contactos.json").pipe(map( (m:any) => m.rows));
  }
}
