import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { SmartwatchService } from '@core/services/smartwatch.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SmartwatchesResolver implements Resolve<Smartwatch[]> {
  constructor(private smartwatchService: SmartwatchService) {}

  resolve(): Observable<Smartwatch[]> {
    return this.smartwatchService.getAll();
  }
}
