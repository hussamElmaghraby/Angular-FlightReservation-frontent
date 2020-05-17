import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TicketService } from 'src/app/services/tickets/tickets.service';
import { PriceTableService } from 'src/app/services/price-table/price-table.service';
import { Connection } from 'src/app/services/connections/connections';
import { Ticket } from 'src/app/services/tickets/tickets';
import { PriceTable } from 'src/app/services/price-table/price-table';

@Component({
  selector: 'app-ticket-confirmation',
  templateUrl: './ticket-confirmation.component.html',
  styleUrls: ['./ticket-confirmation.component.css']
})
export class TicketConfirmationComponent implements OnInit {
    connection: Connection;
    ticket: Ticket;
    pricePerDistance = 0;



  constructor(
          protected activeModal: NgbActiveModal,
          private ticketService: TicketService,
          private priceTableService: PriceTableService,) { }

  ngOnInit() {
    this.fetchPriceTable();
  }

  fetchPriceTable() {
    this.priceTableService.getPriceTable().subscribe( (priceTable: PriceTable)=>{
      this.pricePerDistance = priceTable.pricePerDistance;
    });
  }

  bookTicket(){
    this.ticketService.bookTicket(this.connection.id).subscribe( (ticket:Ticket)=>{
      this.ticket = ticket;
    });
  }

}
