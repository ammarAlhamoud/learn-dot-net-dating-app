import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  public registerMode = false;
  public users: any;

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUsers();
  }

  public registerToggle() {
    this.registerMode = !this.registerMode;
  }

  public cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }

  private getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe({
      next: (response) => (this.users = response),
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }
}
