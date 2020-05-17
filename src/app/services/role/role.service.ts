import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/config/app-config';
import { Role } from './role';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';


@Injectable()
export class RoleService {
    private ROLE_URL = `${API_URL}/admin/roles`

    constructor(
        private http: HttpClient,
    ) {

    }

    getAllRoles(): Observable<Role[]> {
        return this.http.get(this.ROLE_URL).pipe(map((res: Role[]) => res));
    }

    addRole(role: Role): Observable<Role> {
        return this.http.post<Role>(this.ROLE_URL, role);
    }

    updateRole(role: Role): Observable<Role> {
        return this.http.put(this.ROLE_URL, role).pipe(map((res: Role) => res));
    }

    deleteRole(id: number): Observable<Response> {
        return this.http.delete<Response>(this.ROLE_URL + '/' + id);
    }

}