import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '../_services/account.service';
import { NotificationService } from '../_services/notification.service';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const accountService = inject(AccountService);
  const notificationService = inject(NotificationService);

  const user = accountService.getCurrentUser();
  if (user) {
    return true;
  }
  notificationService.error('You shall not pass!');
  return false;
};
