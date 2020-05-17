import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/services/alert/alert.service';
import { UserFull } from 'src/app/services/user/user-full';
import { UserService } from 'src/app/services/user/user.service';
import { RolesAdminComponent } from '../roles-admin/roles-admin.component';

@Component({
  selector: 'app-users-admin',
  templateUrl: './users-admin.component.html',
  styleUrls: ['./users-admin.component.css']
})
export class UsersAdminComponent implements OnInit {
  public users: UserFull[] = [];

  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.updateUserList();
  }
  updateUserList() {
    this.userService.getAllUsers().subscribe((users: UserFull[]) => {
      this.users = users;
      this.users.sort((u1, u2) => u1.id - u2.id);
    });
  }

  updateUser(user: UserFull) {
    this.userService.updateUser(user).subscribe(() => {
      this.alertService.addAlert({ type: 'success', message: 'Updated Successfully' });
      this.updateUserList();
    })
  }

  deleteUser(id: number) {
    this.userService.deleteUser(id).subscribe(() => {
      this.alertService.addAlert({ type: 'success', message: 'Delete Successfully' })
      this.updateUserList();

    })
  }

  editRoles(user: UserFull) {
    // for opening modal windows ..
    let modalRef = this.modalService.open(RolesAdminComponent, { size: 'lg' });
    modalRef.componentInstance.userRoles = this.deepClone(user.roles).sort((r1, r2) => r1.id - r2.id);
    modalRef.result.then( roles => {
      user.roles = roles;
    }, () => {
      
    }
    )
  }

  deepClone(oldArray: Object[]) {
    let newArray: any = [];
    oldArray.forEach( (item) => {
      newArray.push(Object.assign({} , item));
    })
    return newArray;
  }


}
