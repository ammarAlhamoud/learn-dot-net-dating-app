import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

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

  constructor() {}

  ngOnInit() {}

  public registerToggle() {
    this.registerMode = !this.registerMode;
  }

  public cancelRegisterMode(event: boolean) {
    this.registerMode = event;
  }
}
