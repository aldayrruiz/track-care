import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'essentialDate' })
export class EssentialDatePipe implements PipeTransform {
  transform(date: Date | string, day: number, format = 'MMMM d, y'): string | null {
    date = new Date(date);
    return new DatePipe('es-ES').transform(date, format);
  }
}
