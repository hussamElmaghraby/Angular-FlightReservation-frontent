import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Ticket } from './tickets';
import { Observable } from 'rxjs';
import { API_URL } from 'src/app/config/app-config';
import { map } from 'rxjs/operators';


@Injectable()
export class TicketService {

    constructor(
        private http: HttpClient,
    ) {}

    bookTicket(connectionId: number): Observable<Ticket> {
        return this.http.post<Ticket>(`${API_URL}/tickets/book/${connectionId}`, null);
    }

    cancelBookTicket(ticketId: number): Observable<void> {
        return this.http.delete<void>(`${API_URL}/ticket/${ticketId}/cancel`);
    }

    getAllUserTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${API_URL}/tickets`);
    }

    getAllTickets(): Observable<Ticket[]> {
        return this.http.get<Ticket[]>(`${API_URL}/admin/tickets`);
    }

    deleteTicket(id: number): Observable<void> {
        return this.http.delete<void>(`${API_URL}/admin/tickets/${id}`)
    }
}