import { KeyValuePair } from './../../models/KeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/Vehicle';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {

  vehicles:Vehicle[]
  allVehicles:Vehicle[]
  makes:KeyValuePair
  filter:any = {}
  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
        .subscribe(m=> this.makes = m)

    this.vehicleService.getVehicles()
        .subscribe(v => this.vehicles = this.allVehicles =  v)
  }

  onFilterChange(){
    var filteredVehicles = this.allVehicles
    
    if(this.filter.makeId){
      filteredVehicles = filteredVehicles.filter(v => v.make.id == this.filter.makeId)
    }
    
    this.vehicles = filteredVehicles
  }

  resetFilter(){
    this.filter = {}
    this.onFilterChange()
  }
}
