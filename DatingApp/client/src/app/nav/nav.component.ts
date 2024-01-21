import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [FormsModule, AsyncPipe],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  public model: any = {};
  public currenUser$: Observable<User | null> = this.accountService.currenUser$;

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    this.accountService.currenUser$.next(this.getCurrentUser());
  }

  private getCurrentUser(): User | null {
    return this.accountService.getCurrentUser();
  }

  public login(): void {
    this.accountService.login(this.model).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  public logout(): void {
    this.accountService.logout();
  }
}
