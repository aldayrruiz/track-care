import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateSmartwatch } from '@core/models/smartwaches/create.model';
import { RouterService } from '@core/services/router.service';
import { SmartwatchService } from '@core/services/smartwatch.service';
import { SnackerService } from '@core/services/snacker.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-create-smartwatch',
  templateUrl: './create-smartwatch.component.html',
  styleUrls: ['./create-smartwatch.component.scss'],
})
export class CreateSmartwatchComponent {
  formGroup!: FormGroup;
  sending = false;

  constructor(
    private formBuilder: FormBuilder,
    private snackerService: SnackerService,
    private smartwatchService: SmartwatchService,
    private routerService: RouterService
  ) {
    this.initFormGroup();
  }

  get androidId() {
    return this.formGroup.get('androidId');
  }

  createSmartwatch(): void {
    const smartwatch = this.getFormData();
    this.sending = true;
    const msg = 'Se ha registrado el smartwatch correctamente';
    this.smartwatchService
      .create(smartwatch)
      .pipe(finalize(() => (this.sending = false)))
      .subscribe({
        next: async () => {
          this.routerService.goToSmartwatches();
          this.snackerService.showSuccessful(msg);
        },
        error: async (error) => {
          this.snackerService.showError(error.error.message);
        },
      });
  }

  private initFormGroup() {
    const androidIdRegex = /^[a-zA-Z0-9]+$/;
    this.formGroup = this.formBuilder.group({
      androidId: ['', [Validators.required, Validators.pattern(androidIdRegex)]],
    });
  }

  private getFormData(): CreateSmartwatch {
    const androidId = this.androidId?.value;
    return { androidId };
  }
}
