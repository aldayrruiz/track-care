/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserRole } from '@core/models/users/role.model';
import { User } from '@core/models/users/user.model';
import { RouterService } from '@core/services/router.service';
import { SnackerService } from '@core/services/snacker.service';
import { StorageService } from '@core/services/storage.service';
import { UserService } from '@core/services/user.service';
import { BaseTableComponent } from '@shared/components/base-table/base-table.component';
import { DeleteUserComponent } from '@shared/components/dialogs/delete-user/delete-user.component';
import { finalize } from 'rxjs/operators';

interface UserRow {
  id: string;
  name: string;
  email: string;
  role: string;
  smartwatch?: string;
}

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.scss'],
})
export class UsersTableComponent extends BaseTableComponent<User, UserRow> {
  columns = ['name', 'email', 'smartwatch', 'edit', 'delete'];

  private myId!: string;

  constructor(
    private routerService: RouterService,
    private snackerService: SnackerService,
    private storageService: StorageService,
    private userSrv: UserService,
    private matDialog: MatDialog
  ) {
    super();
  }

  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  override ngOnInit(): void {
    super.ngOnInit();
    this.myId = this.storageService.getUser()._id;
  }

  openDeleteDialog(user: UserRow): void {
    const deleteUserDialog = this.matDialog.open(DeleteUserComponent);

    deleteUserDialog.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteUser(user);
      }
    });
  }

  preprocessData(data: User[]): UserRow[] {
    return data.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      smartwatch: user.smartwatch
    }));
  }

  fetchDataAndUpdate(): void {
    this.userSrv
      .getAll()
      .pipe(finalize(() => this.hideLoadingSpinner()))
      .subscribe((users: User[]) => {
        const usersOrderedAlphabetically = this.orderRowsAlphabetically(users);
        // const usersOrderedByRole = this.orderRowsByRole(usersOrderedAlphabetically);
        this.initTable(usersOrderedAlphabetically);
      });
  }

  goToEditUser(userId: string): void {
    this.routerService.goToEditUser(userId);
  }

  isMe = (u: UserRow) => this.myId === u.id;

  getBadgeColor = (n: number) => (n === 0 ? 'warn' : 'primary');

  private deleteUser(user: UserRow) {
    this.userSrv.delete(user.id).subscribe({
      next: async () => {
        const newUsers = this.models.filter((u) => u.id !== user.id);
        this.initTable(newUsers);
        this.snackerService.showSuccessful(`El usuario ${user.name} ha sido eliminado.`);
      },
      error: async (error: HttpErrorResponse) => {
        this.snackerService.showError(error.error.message);
      },
    });
  }

  private orderRowsAlphabetically(users: User[]) {
    const usersOrderedAlphabetically = users.sort((a, b) =>
      // Then order alphabetically
      a.name.localeCompare(b.name)
    );

    return usersOrderedAlphabetically;
  }

  private orderRowsByRole(users: User[]) {
    const usersOrderedAlphabetically = users.sort((a, b) => {
      // Admin must appear first
      // console.log(`Comparing: ${a.fullname} - ${b.fullname}`);
      if (b.role === UserRole.ADMIN) {
        return 1;
      }
      if (a.role === UserRole.ADMIN) {
        return -1;
      }
      return 0;
    });

    return usersOrderedAlphabetically;
  }
}
