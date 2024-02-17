import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe, TitleCasePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../_services/notification.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, AsyncPipe, RouterModule, TitleCasePipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public model: any = {};
  public currenUser$: Observable<User | null> =
    this.accountService.currentUser$;

  constructor(
    private accountService: AccountService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.accountService.currentUser$.next(this.getCurrentUser());
  }

  private getCurrentUser(): User | null {
    return this.accountService.getCurrentUser();
  }

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: (res) => {
        this.router.navigateByUrl('/members');
      },
      complete: () => console.log('complete'),
    });
  }

  public logout(): void {
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}
