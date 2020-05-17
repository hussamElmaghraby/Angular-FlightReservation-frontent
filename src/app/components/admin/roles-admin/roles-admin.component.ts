import { Component, OnInit } from '@angular/core';
import { RoleService } from 'src/app/services/role/role.service';
import { Role } from 'src/app/services/role/role';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-roles-admin',
  templateUrl: './roles-admin.component.html',
  styleUrls: ['./roles-admin.component.css']
})
export class RolesAdminComponent implements OnInit {
  roles: Role[] = [];
  userRoles: Role[] = [];
  rolesFromService: Role[] = [];
  roleToAdd: Role = {
    name: ''
  }
  constructor(
    private roleService: RoleService,
    public activeModal: NgbActiveModal,
  ) { }

  ngOnInit() {
    this.updateRolesList();
  }


  updateRolesList() {
    this.roleService.getAllRoles().subscribe((roles: Role[]) => {
      this.roles = roles;
      this.roles.sort((role1, role2) => role1.id - role2.id);
      this.rolesFromService = this.deepClone(this.roles)
      this.syncUserRoles();

    })
  }

  deepClone(oldArray: Object[]) {
    let newArray: any = [];
    oldArray.forEach((item) => {
      newArray.push(Object.assign({}, item));
    });
    return newArray;
  }

  addRole(role: Role) {
    this.roleService.addRole(role).subscribe(() => {
      this.updateRolesList();
      this.roleToAdd.name = '';
    });
  }

  updateRole(role: Role) {
    this.roleService.updateRole(role).subscribe(() => this.updateRolesList());
  }

  deleteRole(id: number) {
    this.roleService.deleteRole(id).subscribe(() => this.updateRolesList());
  }

  // user Roles for each user .. 

  addUserRole(role: Role) {
    this.userRoles.push(role);
    this.syncUserRoles();
  }

  removeUserRole(role: Role) {
    this.userRoles.splice(this.userRoles.indexOf(role), 1);
  }

  acceptChanges() {
    this.activeModal.close(this.userRoles)
  }

  isRoleAdded(role: Role) {
    //Returns the index of the first element in the array where predicate is true, and -1 otherwise.
    return this.userRoles.findIndex((r) => r.id === role.id) >= 0
  }



  private syncUserRoles() {
    let newUserRoles = [];

    for (let i = this.userRoles.length - 1; i >= 0; i--) {
      let foundById = this.rolesFromService.find((role) => role.id === this.userRoles[i].id);

      if (foundById) {
        newUserRoles.push(foundById);
      }
    }
    newUserRoles.sort((r1, r2) => r1.id - r2.id);
    this.userRoles = newUserRoles;
  }

}
