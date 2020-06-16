import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  public users = [];

  // tslint:disable-next-line: variable-name
  constructor(private _userService: UserService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this._userService.getUsers().subscribe(data => this.users = data);
  }

  onSelect(user) {
    // this.router.navigate(['/users', user._id]);
    this.router.navigate([user._id], { relativeTo: this.route });
  }

  editUser() {

  }

  deleteUser(id) {
    this._userService.deleteUser(id).subscribe(() => {
      this._userService.getUsers().subscribe(data => this.users = data);
    });
  }

}
