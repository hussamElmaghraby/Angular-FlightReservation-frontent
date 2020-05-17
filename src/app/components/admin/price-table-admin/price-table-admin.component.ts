import { Component, OnInit } from '@angular/core';
import { PriceTableService } from 'src/app/services/price-table/price-table.service';
import { PriceTable } from 'src/app/services/price-table/price-table';
import { AlertService } from 'src/app/services/alert/alert.service';

@Component({
  selector: 'app-price-table-admin',
  templateUrl: './price-table-admin.component.html',
  styleUrls: ['./price-table-admin.component.css']
})
export class PriceTableAdminComponent implements OnInit {
  public priceTable: PriceTable = {
    pricePerDistance: null,
    taxPercent: null,
  }
  constructor(
    private priceTableService: PriceTableService,
    private alertService: AlertService,
  ) { }

  ngOnInit() {
    this.fetchPriceTable();
  }
  fetchPriceTable() {
    this.priceTableService.getPriceTable().subscribe(priceTable => {
      this.priceTable = priceTable;
    })
  }

  updatePriceTable() {
    this.priceTableService.setPriceTable(this.priceTable).subscribe( (priceTable: PriceTable) => {
        this.alertService.addAlert({type:'success' , message:"Price table changed successfully"});
        this.priceTable = priceTable;
    }
    );
  }





}
