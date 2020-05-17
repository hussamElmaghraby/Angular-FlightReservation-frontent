import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConnectionsAdminComponent } from './components/admin/connections-admin/connections-admin.component';
import { PriceTableAdminComponent } from './components/admin/price-table-admin/price-table-admin.component';
import { RolesAdminComponent } from './components/admin/roles-admin/roles-admin.component';
import { AdminComponent } from './components/admin/admin.component';
import { MyTicketsComponent } from './components/my-tickets/my-tickets.component';
import { AdminGuard } from './services/http/admin-guard.service';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { ActivateAccountComponent } from './components/activate-account/activate-account.component';


const routes: Routes = [
  { path: 'admin', component: AdminComponent, canActivate: [AdminGuard] },
  { path: 'tickets', component: MyTicketsComponent },
  { path: 'schedule', component: ScheduleComponent },
  { path: 'activate-account', component: ActivateAccountComponent },
  { path: '', redirectTo: '/schedule', pathMatch: 'full' },


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
