import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  RouterStateSnapshot,
} from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const accountService = inject(AccountService);
  const toastr = inject(ToastrService);

  const user = accountService.getCurrentUser();
  if (user) {
    return true;
  }
  toastr.error('You shall not pass!');

  // Workaround for toastr not clearing
  setTimeout(() => {
    toastr.clear();
  }, 5000);

  return false;
};
