import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: 'incidents/:id', component: DashboardComponent },
  { path: 'incidents', component: DashboardComponent },
  { path: '', pathMatch: 'full', redirectTo: 'incidents' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
