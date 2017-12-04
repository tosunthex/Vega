import { Injectable } from '@angular/core';
import { Http } from '@angular/http'; 
import 'rxjs/add/operator/map';
import {Res} from "awesome-typescript-loader/dist/checker/protocol";
import {SaveVehicle, Vehicle} from "../models/Vehicle";

@Injectable()
export class VehicleService {
  private readonly vehicleEnpoint = "/api/vehicles"
  constructor(private http: Http) { }

  getFeatures() {
    return this.http.get('/api/features')
      .map(res => res.json());
  }

  getMakes() {
    return this.http.get('/api/makes')
      .map(res => res.json());
  }
  
  getVehicle(id){
    return this.http.get(this.vehicleEnpoint+'/'+id)
        .map(res => res.json());
  }

  getVehicles(filter){
    return this.http.get(this.vehicleEnpoint+'?'+this.toQueryString(filter))
        .map(res => res.json());
  }

  toQueryString(obj){
    var parts = []
    for(var property in obj){
      var value = obj[property]
      if(value != null && value != undefined)
      {
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value))
      }
    }

    return parts.join('&');
  }


  create(vehicle)
  {
    return this.http.post(this.vehicleEnpoint,vehicle)
        .map(res => res.json());
  }

  update(vehicle:SaveVehicle){
    return this.http.put(this.vehicleEnpoint+'/'+vehicle.id,vehicle)
        .map(res=> res.json());
  }
  
  deleteVehicle(id){
    return this.http.delete(this.vehicleEnpoint+'/'+id)
        .map(res=> res.json())
  }


}
