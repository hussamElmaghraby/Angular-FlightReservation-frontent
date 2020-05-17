import { Component, OnInit } from '@angular/core';
import { TicketService } from 'src/app/services/tickets/tickets.service';
import { Ticket } from 'src/app/services/tickets/tickets';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-tickets-admin',
  templateUrl: './tickets-admin.component.html',
  styleUrls: ['./tickets-admin.component.css']
})
export class TicketsAdminComponent implements OnInit {

  constructor(
        private ticketService: TicketService,
        private alertService: AlertService) { }
    tickets: Ticket[] = [];
  ngOnInit() {
    this.fetchTickets();
  }

  fetchTickets(){
    this.ticketService.getAllTickets().subscribe( (tickets: Ticket[]) => {
      this.tickets = tickets;
      this.tickets.sort((r1 , r2)=> r1.reservationDate > r2.reservationDate ? -1 : 1 );
    });
  }

  deleteTicket(id:number){
    this.ticketService.deleteTicket(id).subscribe( ()=>{
      this.alertService.addAlert({type:'success' , message:'Deleted Successfully'});
      this.fetchTickets();
    });
  }

}
