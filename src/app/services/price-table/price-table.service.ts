import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PriceTable } from './price-table';
import { API_URL } from 'src/app/config/app-config';
import { map } from 'rxjs/operators';


@Injectable()
export class PriceTableService {
    PRI_URL = `${API_URL}/admin/pricetable`;
    constructor(
        private http: HttpClient
    ) { }
    setPriceTable(priceTable): Observable<PriceTable> {
        return this.http.post(this.PRI_URL, priceTable).pipe(map((res: PriceTable) => res));
    }

    getPriceTable(): Observable<PriceTable> {
        return this.http.get(`${API_URL}/pricetable`).pipe(map((res: PriceTable) => res));
    }
}