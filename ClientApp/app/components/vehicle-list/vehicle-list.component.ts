import { KeyValuePair } from './../../models/KeyValuePair';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/Vehicle';
import { Component, OnInit } from '@angular/core';
import { Query } from '@angular/core/src/metadata/di';

@Component({
  selector: 'app-vehicle-list',
  templateUrl: './vehicle-list.component.html',
  styleUrls: ['./vehicle-list.component.css']
})
export class VehicleListComponent implements OnInit {
  private readonly PAGE_SIZE=3
  queryResult:any = {}
  makes:any[]
  models:KeyValuePair
  query:any = {
    pageSize:this.PAGE_SIZE
  }
  columns = [
    {title:"Id"},
    {title:"Contact Name",key:"contactName",isSortable:true},
    {title:"Make",key:"make",isSortable:true},
    {title:"Model",key:"model",isSortable:true},
    {}
  ]
  constructor(private vehicleService:VehicleService) { }

  ngOnInit() {
    this.vehicleService.getMakes()
        .subscribe(m=> this.makes = m)    
    this.populateVehicles()
  }

  private populateModels(){
    delete this.query.modelId
    let selectedMake = this.makes.find(m => m.id == this.query.makeId)
    this.models = selectedMake ? selectedMake.models : []
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(result => this.queryResult =  result)
  }

  onFilterChange(){
    this.query.page = 1
    this.populateVehicles();
  }

  resetFilter(){
    this.query = {
      page:1,
      pageSize:this.PAGE_SIZE
    }
    this.populateVehicles();
  }

  sortBy(columnName){
    if(this.query.sortBy === columnName){
      this.query.isSortAscending = !this.query.isSortAscending;
    }else{
      this.query.sortBy = columnName;
      this.query.isSortAscending = true;
    }
    this.populateVehicles();
  }

  onPageChange(page){
    this.query.page = page;
    this.populateVehicles();
  }
}
