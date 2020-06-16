import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public users = [];
  public userId;

  // tslint:disable-next-line: variable-name
  constructor(private route: ActivatedRoute, private router: Router, private _userService: UserService) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(data => this.users = data);
    this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      this.userId = id;
    });
  }

  goPrevious() {
    const previousId = this.users[this.users.findIndex(i => i._id === this.userId) - 1]._id;
    this.router.navigate(['/users', previousId]);
  }

  goNext() {
    const nextId = this.users[this.users.findIndex(i => i._id === this.userId) + 1]._id;
    this.router.navigate(['/users', nextId]);
  }

  goBackUsers() {
    // this.router.navigate(['/users']);
    this.router.navigate(['../'], { relativeTo: this.route});
  }

}
