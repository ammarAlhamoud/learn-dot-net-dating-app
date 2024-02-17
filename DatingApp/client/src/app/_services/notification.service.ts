import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

// this service is used to display notifications to the user with workaround for toastr not clearing
@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  TOASTR_TIMEOUT: number = 5000;

  constructor(private toastr: ToastrService) {}

  public success(message: string, title?: string): void {
    this.toastr.success(message, title);
    this.clear();
  }

  public error(message: string, title?: string): void {
    this.toastr.error(message, title);
    this.clear();
  }

  public warning(message: string, title?: string): void {
    this.toastr.warning(message, title);
    this.clear();
  }

  public info(message: string, title?: string): void {
    this.toastr.info(message, title);
    this.clear();
  }

  public clear(): void {
    setTimeout(() => {
      this.toastr.clear();
    }, this.TOASTR_TIMEOUT);
  }
}
