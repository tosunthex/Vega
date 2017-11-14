import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class VehicleService {
  constructor(private http:Http) { }

  getMakes(){
    return this.http.get('/api/makes').map(r => r.json());
  }
  getFeature(){
      return this.http.get('/api/features').map(r => r.json());
  }
}
