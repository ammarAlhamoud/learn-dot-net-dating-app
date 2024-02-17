import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { take } from 'rxjs';
import { DOCUMENT } from '@angular/common';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const accountService = inject(AccountService);
  const document: Document = inject(DOCUMENT);

  const localStorage: Storage | null =
    document.defaultView?.localStorage ?? null;

  accountService.currentUser$.pipe(take(1)).subscribe((user) => {
    const token = user
      ? user.token
      : JSON.parse(localStorage?.getItem('user') || '{}').token;

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`,
        },
      });
    }
  });
  return next(req);
};
