import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API } from '@core/constants/api.paths';
import { Position } from '@core/models/positions/position.dto';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PositionService {
  private userUrl = `${environment.api}${API.positions}`;

  constructor(private http: HttpClient) {}

  lastPositions(): Observable<Position[]> {
    const path = `${this.userUrl}/lastPositions`;
    return this.http.get<Position[]>(path);
  }
}
