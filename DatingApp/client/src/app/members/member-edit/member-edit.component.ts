import { Component, HostListener, ViewChild } from '@angular/core';
import { Member } from '../../_models/member';
import { User } from '../../_models/user';
import { AccountService } from '../../_services/account.service';
import { MembersService } from '../../_services/members.service';
import { take } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { NotificationService } from '../../_services/notification.service';

@Component({
  selector: 'app-member-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './member-edit.component.html',
  styleUrl: './member-edit.component.scss',
})
export class MemberEditComponent {
  @ViewChild('editForm') editForm: NgForm | undefined;
  @HostListener('window:beforeunload', ['$event']) unloadNotification(
    $event: any
  ) {
    if (this.editForm?.dirty) {
      $event.returnValue = true;
    }
  }

  public member: Member | undefined;
  public user: User | null = null;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService,
    private notificationService: NotificationService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit() {
    this.loadMember();
  }

  public updateMember() {
    this.memberService.updateMember(this.editForm?.value).subscribe(() => {
      this.notificationService.success('Profile updated successfully');
      this.editForm?.reset(this.member);
    });
  }

  private loadMember() {
    if (!this.user) return;

    this.memberService
      .getMember(this.user?.username)
      .subscribe((member) => (this.member = member));
  }
}
