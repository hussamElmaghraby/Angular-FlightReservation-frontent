import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_URL } from 'src/app/config/app-config';
import { Connection } from './connections';

@Injectable()
export class ConnectionsService {
    private CON_URL: string = `${API_URL}/admin/connections`;
    connections:Connection[];

    constructor(private http: HttpClient) {

    }

    getAllconnection(): Observable<Connection[]> {
        return this.http.get<Connection[]>(`${API_URL}/connections`);
    }

    addConnection(connection: Connection): Observable<Connection> {

        return this.http.post<Connection>(this.CON_URL, connection);
    }

    updateConnection(connection: Connection): Observable<Connection> {
        return this.http.put<Connection>(this.CON_URL, connection);
    }

    deleteConnection(id: number): Observable<Response> {
        return this.http.delete<Response>(this.CON_URL+'/'+ id)
    }
}