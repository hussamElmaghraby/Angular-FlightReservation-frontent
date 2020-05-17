import { Component, OnInit, ModuleWithComponentFactories } from '@angular/core';
import { Connection } from 'src/app/services/connections/connections';
import * as moment from 'moment';
import { ConnectionsService } from 'src/app/services/connections/connections.service';
import { PriceTableService } from 'src/app/services/price-table/price-table.service';
import { PriceTable } from 'src/app/services/price-table/price-table';
import { NgbModal, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { UserService } from 'src/app/services/user/user.service';
import { MyTicketsComponent } from '../my-tickets/my-tickets.component';
import { TicketConfirmationComponent } from '../ticket-confirmation/ticket-confirmation.component';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit {
  model : NgbDateStruct;
  private connections: Connection[];
  protected filteredConnections: Connection[] = [];
  pricePerDistance = 0;

  protected filters = {
    dateMin: moment().hour(0).minute(0).format('YYYY-MM-DD hh:mm'),
    dateMax: null,
    from: '',
    to: ''
  };

  constructor(private connectionsService: ConnectionsService,
    private priceTableService: PriceTableService,
    private modalService: NgbModal,
    public userService: UserService) { }

  ngOnInit() {
    this.fetchConnections();
    this.fetchPriceTable();
  }

  fetchPriceTable() {
    this.priceTableService.getPriceTable().subscribe((priceTable: PriceTable) => {
      this.pricePerDistance = priceTable.pricePerDistance;
    })
  }

  fetchConnections() {
    this.connectionsService.getAllconnection().subscribe((connections: Connection[]) => {
      this.connections = connections;
      this.connections.sort((c1, c2) => c1.departureDate > c2.departureDate ? 1 : -1);
      this.filterConnections();
    })
  }


  filterConnections() {
    this.filteredConnections = this.connections.filter((connection: Connection) => {
      
      if (this.filters.dateMin && moment(connection.departureDate).isBefore(this.filters.dateMin)) {
        return false;
      }

      if (this.filters.dateMax && moment(connection.departureDate).isAfter(this.filters.dateMax)) {
        return false;
      }

      if (this.filters.from && connection.startPlace.toLowerCase().indexOf(this.filters.from.toLowerCase()) < 0) {
        return false;
      }

      if (this.filters.to && connection.endPlace.toLowerCase().indexOf(this.filters.to.toLowerCase()) < 0) {
        return false;
      }
      return true;

    });
  }

  clearFilter() {
    this.filters = {
      dateMin: null,
      dateMax: null,
      from: '',
      to: ''
    };
    this.fetchConnections();
  }

  moreThan30MinutesToDeparture(connection: Connection) {
    return moment(connection.departureDate).diff(moment(), "minutes") > 30;
  }
  
  bookTicket(connection: Connection) {
    let modalRef = this.modalService.open(TicketConfirmationComponent, { size: 'lg' });
    modalRef.componentInstance.connection = connection;
    modalRef.result.then(() => {
      this.fetchConnections();
    }, () => {
      this.fetchConnections();
    })
  }

}
