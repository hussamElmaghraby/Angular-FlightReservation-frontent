import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserService } from '../user/user.service';



@Injectable()
export class AdminGuard implements CanActivate{
    
    constructor(private userService: UserService){}

    canActivate(route:ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        return this.userService.userHasPermission('ADMIN');
    }

}