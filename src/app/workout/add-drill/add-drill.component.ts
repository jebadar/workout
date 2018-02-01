import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { WorkoutService } from '../workout.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ListDrillsComponent } from '../../drills/list-drills/list-drills.component'

export interface ConfirmModel {
  drills: string;
}

@Component({
  selector: 'add-drill-component',
  templateUrl: './add-drill.component.html',
  styleUrls: ['./add-drill.component.css']
})
export class AddDrillComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  drills: string;
  drillsList: any = [];
  count = 0;
  constructor(
    dialogService: DialogService,
    private workoutService: WorkoutService,
    private toastr: ToastsManager
  ) {
    super(dialogService);
  }
  ngOnInit() {
    this.selectDrills = this.selectDrills.bind(this)
  }
  loading = false;
  submit() {
    this.result = this.drillsList;
    this.close();
  }
  navigate() {
    //
    this.close();
  }
  selectDrills = function (drill) {
    let dr = Object.assign({},drill);
     delete dr.selected;
    if(this.drillsList.length > 0){
      let tempDrill = this.drillsList.find(x => x.id == dr.id);
      if(tempDrill != null){
        this.count--;
        this.drillsList.splice(drill,1);
      } else {
        this.count++;
        this.drillsList.push(drill)
      }
    }else {
      this.count++;
      this.drillsList.push(drill)
    }
    
  }
}


