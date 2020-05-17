import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Captcha } from './captcha';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {API_URL} from '../../config/app-config';

@Injectable({
  providedIn: 'root'
})
export class CaptchaService {
  
  constructor(private http: HttpClient ) { }

  getCaptcha() : Observable<Captcha> {
     return this.http.get<Captcha>( `${API_URL}/captcha`).pipe(map( (response : any)  => response ));
  }
}
