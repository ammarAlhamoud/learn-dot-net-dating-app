import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { User } from '../_models/user';
import { BehaviorSubject, map } from 'rxjs';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private baseUrl = 'https://localhost:5001/api/';
  private localStorage?: Storage = undefined;

  public currenUser$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.localStorage = this.document.defaultView?.localStorage;
  }

  public login(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/login', model).pipe(
      map((response: User) => {
        const user = response;
        this.setCurrentUser(user);
      })
    );
  }

  public logout() {
    if (this.localStorage) {
      this.localStorage.removeItem('user');
    }
    this.currenUser$.next(null);
  }

  public getCurrentUser(): User | null {
    if (!this.localStorage) {
      return null;
    }
    const user = JSON.parse(this.localStorage.getItem('user') || '{}');

    return user.username ? user : null;
  }

  public register(model: any) {
    return this.http.post<User>(this.baseUrl + 'account/register', model).pipe(
      map((user: User) => {
        if (user) {
          this.setCurrentUser(user);
        }
      })
    );
  }

  private setCurrentUser(user: User | null) {
    if (user && this.localStorage) {
      this.currenUser$.next(user);
      this.localStorage.setItem('user', JSON.stringify(user));
    }
  }
}
