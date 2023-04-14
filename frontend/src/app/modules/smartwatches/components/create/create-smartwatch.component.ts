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

  get MAC() {
    return this.formGroup.get('MAC');
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
    const MACRegex = /^([0-9A-F]{2}[:]){5}([0-9A-F]{2})$/;
    this.formGroup = this.formBuilder.group({
      MAC: ['', [Validators.required, Validators.pattern(MACRegex)]],
    });
  }

  private getFormData(): CreateSmartwatch {
    const MAC = this.MAC?.value;
    return { MAC };
  }
}
