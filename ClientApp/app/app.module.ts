import { AuthService } from './services/auth.service';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { PhotoService } from './services/photo.services';
import { PaginationComponent } from './components/shared/pagination.component';
import * as Raven from "raven-js"
import { FormsModule } from '@angular/forms'; 
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastyModule} from "ng2-toasty";
import { UniversalModule } from 'angular2-universal';
import { ChartModule} from "angular2-chartjs";


import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import {AppErrorHandler} from "./app.error-handler";
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';
import { VehicleViewComponent } from './components/vehicle-view/vehicle-view.component';
import { BrowserXhr } from '@angular/http';
import { AdminComponent } from './components/admin/admin.component';

Raven
    .config('https://b26551183a714d3294685aa16f2df724@sentry.io/251897')
    .install();

@NgModule({
    bootstrap: [ AppComponent ],
    declarations: [
        AppComponent,
        NavMenuComponent,
        CounterComponent,
        FetchDataComponent,
        HomeComponent,
        VehicleFormComponent,
        VehicleListComponent,
        PaginationComponent,
        VehicleViewComponent,
        AdminComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        ChartModule,
        FormsModule,
        ToastyModule.forRoot(),        
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/edit/:id', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleViewComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'home', component: HomeComponent },
            { path: 'admin', component: AdminComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        {provide:ErrorHandler, useClass:AppErrorHandler},
        {provide:BrowserXhr,useClass:BrowserXhrWithProgress},
        AuthService,
        VehicleService,
        PhotoService,
        ProgressService
    ]
})
export class AppModule {
}
