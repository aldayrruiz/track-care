import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.paths';
import { CreateSmartwatch } from '@core/models/smartwaches/create.model';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SmartwatchService {
  private smartwatchUrl = `${environment.api}${API.smartwatches}`;

  constructor(private http: HttpClient) {}

  getAll(): Observable<Smartwatch[]> {
    const path = `${this.smartwatchUrl}/`;
    return this.http.get<Smartwatch[]>(path);
  }

  create(smartwatch: CreateSmartwatch): Observable<Smartwatch> {
    const path = `${this.smartwatchUrl}/`;
    return this.http.post<Smartwatch>(path, smartwatch);
  }

  get(id: string): Observable<Smartwatch> {
    const path = `${this.smartwatchUrl}/${id}/`;
    return this.http.get<Smartwatch>(path);
  }

  delete(id: string): Observable<void> {
    const path = `${this.smartwatchUrl}/${id}/`;
    return this.http.delete<void>(path);
  }
}
