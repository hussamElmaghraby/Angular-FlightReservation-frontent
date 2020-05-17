import { Component, OnInit } from '@angular/core';
import { AlertService } from 'src/app/services/alert/alert.service';
import { Alert } from 'src/app/services/alert/alert';

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  constructor(public alertService: AlertService) { }


  ngOnInit() {
  }

  closeAlert(alert: Alert) {
    this.alertService.removeAlert(alert);
  }

}
