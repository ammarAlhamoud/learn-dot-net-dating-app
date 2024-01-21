import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  @Output() public cancelRegister = new EventEmitter();

  public model: any = {};

  constructor(private accountService: AccountService) {}

  public register() {
    this.accountService.register(this.model).subscribe({
      next: () => {
        this.cancel();
      },
      error: (error) => console.log(error),
      complete: () => console.log('complete'),
    });
  }

  public cancel() {
    this.cancelRegister.emit(false);
  }
}
