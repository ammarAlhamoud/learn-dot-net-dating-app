import { Component, OnInit } from '@angular/core';
import { Member } from '../../_models/member';
import { MembersService } from '../../_services/members.service';
import { MemberCardComponent } from '../member-card/member-card.component';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-member-list',
  standalone: true,
  imports: [MemberCardComponent, AsyncPipe],
  templateUrl: './members-list.component.html',
  styleUrl: './members-list.component.scss',
})
export class MembersListComponent implements OnInit {
  public members$: Observable<Member[]> | undefined;
  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadMembers();
  }

  private loadMembers() {
    this.members$ = this.memberService.getMembers();
  }
}
