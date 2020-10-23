import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';

import { FlexLayoutModule } from '@angular/flex-layout';
import { GoogleMapsModule } from '@angular/google-maps';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IncidentListComponent } from './dashboard/incident-list/incident-list.component';
import { IncidentDetailsComponent } from './dashboard/incident-details/incident-details.component';
import { IncidentCollectionComponent } from './dashboard/incident-map/incident-map.component';
import { IncidentFeedComponent } from './dashboard/incident-feed/incident-feed.component';
import { IncidentWeatherComponent } from './dashboard/incident-weather/incident-weather.component';
import { IncidentService } from './services';
import { IncidentHandleComponent } from './dashboard/incident-handle/incident-handle.component';
import { IncidentAddressComponent } from './dashboard/incident-address/incident-address.component';
import { IncidentListItemComponent } from './dashboard/incident-list-item/incident-list-item.component';
import { IncidentApparatusListComponent } from './dashboard/incident-apparatus-list/incident-apparatus-list.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IncidentListComponent,
    IncidentDetailsComponent,
    IncidentCollectionComponent,
    IncidentFeedComponent,
    IncidentWeatherComponent,
    IncidentHandleComponent,
    IncidentAddressComponent,
    IncidentListItemComponent,
    IncidentApparatusListComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientJsonpModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatGridListModule,
    MatExpansionModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatProgressSpinnerModule,
    MatNativeDateModule,
    MatListModule,
    FlexLayoutModule,
    GoogleMapsModule,
    FontAwesomeModule,
    AppRoutingModule
  ],
  providers: [
    IncidentService
  ],
  bootstrap: [
    AppComponent
  ],
})
export class AppModule {}
