import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict } from 'date-fns';
import es from 'date-fns/locale/es';

@Pipe({ name: 'distance' })
export class DistanceFromNow implements PipeTransform {
  transform(date?: Date | string, addSuffix = true): string {
    const d = date ? new Date(date) : new Date();
    return formatDistanceToNowStrict(d, { addSuffix, locale: es });
  }
}
