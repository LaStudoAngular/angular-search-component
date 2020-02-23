import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Organisation } from '../interfaces/organisation';

@Injectable({
  providedIn: 'root'
})
export class OrganisationService {
  constructor(private http: HttpClient) {}

  public getAllOrganisations(): Observable<Organisation[]> {
    return this.http.get<Organisation[]>('./../../assets/data/organisations.json');
  }
}
