import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { VehicleService} from "../../services/vehicle.service";
import any = jasmine.any;


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class VehicleFormComponent implements OnInit {
    private features: any[];
    private makes: any[];
    private models:any[];
    private vehicle: any = {};
  
  constructor(
      private vehicleService:VehicleService) { }

  ngOnInit() {
    
    this.vehicleService.getMakes().subscribe(m => this.makes = m);
    this.vehicleService.getFeature().subscribe(f => this.features = f);
    
    
  }
  
  onMakeChange(){
   let selectedMake = this.makes.find(m => m.id == this.vehicle.make);
   this.models = selectedMake ? selectedMake.models: [];
  }

}
