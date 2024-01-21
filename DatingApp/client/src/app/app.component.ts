import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { NavComponent } from './nav/nav.component';
import { AccountService } from './_services/account.service';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NavComponent, HomeComponent],
  providers: [AccountService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  public title = 'Dating App';
  public users: any;

  constructor() {}

  ngOnInit(): void {}
}
