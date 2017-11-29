import * as Raven from "raven-js"
import { FormsModule } from '@angular/forms'; 
import {ErrorHandler, NgModule} from '@angular/core';
import { RouterModule } from '@angular/router';
import {ToastyModule} from "ng2-toasty";
import { UniversalModule } from 'angular2-universal';

import { VehicleService } from './services/vehicle.service';
import { AppComponent } from './components/app/app.component'
import { NavMenuComponent } from './components/navmenu/navmenu.component';
import { HomeComponent } from './components/home/home.component';
import { FetchDataComponent } from './components/fetchdata/fetchdata.component';
import { CounterComponent } from './components/counter/counter.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import {AppErrorHandler} from "./app.error-handler";
import { VehicleListComponent } from './components/vehicle-list/vehicle-list.component';

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
        VehicleListComponent
    ],
    imports: [
        FormsModule,
        ToastyModule.forRoot(),
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        RouterModule.forRoot([
            { path: '', redirectTo: 'vehicles', pathMatch: 'full' },
            { path: 'vehicles/new', component: VehicleFormComponent },
            { path: 'vehicles/:id', component: VehicleFormComponent },
            { path: 'vehicles', component: VehicleListComponent },
            { path: 'home', component: HomeComponent },
            { path: 'counter', component: CounterComponent },
            { path: 'fetch-data', component: FetchDataComponent },
            { path: '**', redirectTo: 'home' }
        ])
    ],
    providers: [
        {
            provide:ErrorHandler, 
            useClass:AppErrorHandler
        },
      VehicleService
    ]
})
export class AppModule {
}
