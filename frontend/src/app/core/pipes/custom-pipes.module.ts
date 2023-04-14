import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { EssentialDatePipe } from './date.pipe';
import { DistanceFromNow } from './distance-from-now.pipe';
import { EssentialDatetimePipe } from './essential-date.pipe';
import { MonthLabel } from './month-label.pipe';
import { NotTooLongPipe } from './not-too-long.pipe';

@NgModule({
  declarations: [
    EssentialDatetimePipe,
    DistanceFromNow,
    NotTooLongPipe,
    MonthLabel,
    EssentialDatePipe,
  ],
  imports: [CommonModule],
  exports: [EssentialDatetimePipe, DistanceFromNow, NotTooLongPipe, MonthLabel, EssentialDatePipe],
})
export class CustomPipesModule {}
