import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Connection } from 'src/app/services/connections/connections';
import { ConnectionsService } from '../../../services/connections/connections.service';
@Component({
  selector: 'app-connections-admin',
  templateUrl: './connections-admin.component.html',
  styleUrls: ['./connections-admin.component.css']
})
export class ConnectionsAdminComponent implements OnInit {
  public connections: Connection[] = [];
  private emptyConnection = {
    startPlace: '',
    endPlace: '',
    distance: 10,
    departureDate: moment().add(1, 'day').minute(0).format('YYYY-MM-DD HH:mm'),
    arrivalDate: moment().add(1, 'day').add(2, 'hours').minute(0).format('YYYY-MM-DD HH:mm'),
    places: 40,
    takenPlaces: 0,
  }
  // Object ->  provides functionality to all javascript objects ..
  // assign(target , source) -> copy the value from source object properties to target properties ..  
  private newConnection: Connection = Object.assign({}, this.emptyConnection)

  constructor(
    private connectionsService: ConnectionsService,
    private alertService: AlertService) { }

  ngOnInit() {
    this.fetchConnections();
  }

  fetchConnections() {
    this.connectionsService.getAllconnection().subscribe((connections: Connection[]) => {
      this.connections = connections;
      this.connections.sort( (d1 , d2)=> d1.id - d2.id  )
      this.connections.push(this.newConnection);
    })
  }

  addConnection(connection: Connection) {
    connection.departureDate = connection.departureDate.toString();
    connection.arrivalDate = connection.arrivalDate.toString();
    this.connectionsService.addConnection(connection).subscribe(() => {
      this.alertService.addAlert({ type: 'success', message: 'Added Successfully' });
      this.newConnection = Object.assign({}, this.emptyConnection);
      this.fetchConnections();
    });
  }

  updateConnection(connection: Connection) {
    connection.departureDate = connection.departureDate.toString();
    connection.arrivalDate = connection.arrivalDate.toString();
    this.connectionsService.updateConnection(connection).subscribe(() => {
      this.alertService.addAlert({ type: "success", message: "Updated Successfully" });
      this.fetchConnections();
    })
  }
  deleteConnection(id : number) {
    this.connectionsService.deleteConnection(id).subscribe( ()=>{
      this.alertService.addAlert({type:'success' , message:"Deleted Successfully"});
      this.fetchConnections();
    });
  }

}
