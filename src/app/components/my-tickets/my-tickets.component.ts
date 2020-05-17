import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/tickets.service';
import { AlertService } from 'src/app/services/alert/alert.service';
import * as moment from 'moment';
import { Ticket } from 'src/app/services/tickets/tickets';
import { Observable } from 'rxjs';
import { Connection } from 'src/app/services/connections/connections';

@Component({
  selector: 'app-my-tickets',
  templateUrl: './my-tickets.component.html',
  styleUrls: ['./my-tickets.component.css']
})
export class MyTicketsComponent implements OnInit {
  tickets: Ticket[] = []
  constructor(private ticketService: TicketService, private alertService: AlertService) { }

  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets(){
    this.ticketService.getAllUserTickets().subscribe( (tickets: Ticket[]) =>{
        this.tickets = tickets;
        // reservationDate is String ..
        this.tickets.sort( (r1 , r2 ) => r1.reservationDate < r1.reservationDate ? 1 : -1 );
    });
  }

  cancelReservation(ticketId: number){
    this.ticketService.cancelBookTicket(ticketId).subscribe( ()=>{
      this.alertService.addAlert({type:'success' , message:' Reservation Canceled Successfully '});
      this.fetchTickets();
    });
  }
  
  moreThan30MinutesToDeparture(connection: Connection): boolean{
      return moment(connection.departureDate).diff(moment() , 'minutes') > 30;
  }

  }




