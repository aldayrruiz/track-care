/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Smartwatch } from '@core/models/smartwaches/smartwatch.model';
import { SmartwatchService } from '@core/services/smartwatch.service';
import { SnackerService } from '@core/services/snacker.service';
import { StorageService } from '@core/services/storage.service';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { DeleteSmartwatchComponent } from '@shared/components/dialogs/delete-smartwatch/delete-smartwatch.component';
import { finalize } from 'rxjs/operators';

interface SmartwatchRow {
  id: string;
  androidId: string;
}

@Component({
  selector: 'app-smartwatches-table',
  templateUrl: './smartwatches-table.component.html',
  styleUrls: ['./smartwatches-table.component.scss'],
})
export class SmartwatchesTableComponent extends BaseTableComponent<Smartwatch, SmartwatchRow> {
  columns = ['androidId', 'delete'];

  constructor(
    private snackerService: SnackerService,
    private storageService: StorageService,
    private smartwatchService: SmartwatchService,
    private matDialog: MatDialog
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    super.ngOnInit();
  }

  openDeleteDialog(smartwatch: SmartwatchRow): void {
    const deleteSmartwatchDialog = this.matDialog.open(DeleteSmartwatchComponent);

    deleteSmartwatchDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSmartwatch(smartwatch);
      }
    });
  }

  preprocessData(data: Smartwatch[]): SmartwatchRow[] {
    return data.map((smartwatch) => ({
      id: smartwatch.id,
      androidId: smartwatch.androidId,
    }));
  }

  fetchDataAndUpdate(): void {
    this.smartwatchService
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((smartwatches: Smartwatch[]) => {
        const smartwatchesOrderedAlphabetically = this.orderRowsAlphabetically(smartwatches);
        // const smartwatchesOrderedByRole = this.orderRowsByRole(smartwatchesOrderedAlphabetically);
        this.initTable(smartwatchesOrderedAlphabetically);
      });
  }

  getBadgeColor = (n: number) => (n === 0 ? 'warn' : 'primary');

  private deleteSmartwatch(smartwatch: SmartwatchRow) {
    this.smartwatchService.delete(smartwatch.id).subscribe({
      next: async () => {
        const newSmartwatches = this.models.filter((u) => u.id !== smartwatch.id);
        this.initTable(newSmartwatches);
        this.snackerService.showSuccessful(`El smartwatch ${smartwatch.androidId} ha sido eliminado.`);
      },
      error: async (error: HttpErrorResponse) => {
        this.snackerService.showError(error.error.message);
      },
    });
  }

  private orderRowsAlphabetically(smartwatches: Smartwatch[]) {
    const smartwatchesOrderedAlphabetically = smartwatches.sort((a, b) =>
      // Then order alphabetically
      a.androidId.localeCompare(b.androidId)
    );

    return smartwatchesOrderedAlphabetically;
  }
}
