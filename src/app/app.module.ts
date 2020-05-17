import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { NgbModule, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import {Ng2DatetimePickerModule} from 'ng2-datetime-picker';
// TranslateHttpLoader to load translations from "/assets/i18n/[lang].json"
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpConfigInterceptor} from './services/http/interceptor-http.service';
import { AppComponent } from './app.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';
import { AlertsComponent } from './components/alerts/alerts.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { RegisterComponent } from './components/register/register.component';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { TicketConfirmationComponent } from './components/ticket-confirmation/ticket-confirmation.component';
import { ConnectionsAdminComponent } from './components/admin/connections-admin/connections-admin.component';
import { PriceTableAdminComponent } from './components/admin/price-table-admin/price-table-admin.component';
import { RolesAdminComponent } from './components/admin/roles-admin/roles-admin.component';
import { TicketsAdminComponent } from './components/admin/tickets-admin/tickets-admin.component';
import { UsersAdminComponent } from './components/admin/users-admin/users-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import {AdminGuard} from './services/http/admin-guard.service';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user/user.service';
import { CaptchaService } from './services/captcha/captcha.service';
import { AlertService } from './services/alert/alert.service';
import { EqualsDirective } from './shared/equals.directive';
import { ConnectionsService } from './services/connections/connections.service';
import { PriceTableService } from './services/price-table/price-table.service';
import { RoleService } from './services/role/role.service';
import { TicketService } from './services/tickets/tickets.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from "ngx-spinner";  

//requires an exported function for factories ..
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    ActivateAccountComponent,
    AlertsComponent,
    MyTicketsComponent,
    RegisterComponent,
    ScheduleComponent,
    TicketConfirmationComponent,
    ConnectionsAdminComponent,
    PriceTableAdminComponent,
    RolesAdminComponent,
    TicketsAdminComponent,
    UsersAdminComponent,
    AdminComponent,
    EqualsDirective,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    FormsModule,
    Ng2DatetimePickerModule,
    NgxSpinnerModule,
    // loads when the application starts .. 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient]
      }
    }),
    BrowserAnimationsModule,

  ],
  //The set of components to compile when this NgModule is defined, so that they can be dynamically loaded into the view.
  entryComponents: [RegisterComponent, RolesAdminComponent,TicketConfirmationComponent ],
  providers: [UserService,
    CaptchaService,
    AlertService,
    NgbActiveModal,
    ConnectionsService,
    PriceTableService,
    RoleService,
    AdminGuard,
    TicketService,
    HttpConfigInterceptor,
    { provide: HTTP_INTERCEPTORS, useClass: HttpConfigInterceptor, multi: true }
  ],

  bootstrap: [AppComponent]
})
export class AppModule { }
