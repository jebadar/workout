import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { WorkoutService } from '../workout.service'
import { Constants } from '../../constants'
import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';
import { PreviewDrillComponent } from '../../drills/preview-drill/preview-drill.component';
import { MainAddDrillComponent } from '../../drills/main-add-drill/main-add-drill.component'
import { ConfirmComponent } from '../../shared/confirm/confirm.component';

@Component({
  selector: 'app-edit-main',
  templateUrl: './edit-main.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class EditMainComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private toastr: ToastsManager,
    private router: Router,
    private dialogService: DialogService    
  ) { }

  assetsUrl = Constants.ASSET_URL;

  workout_id;
  workout:any = {};

  loading = false;
  enablePreview = false;
  enableAddDrill = false;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.workout_id = params.id;
        if (this.workout_id == undefined || this.workout_id == 'null') {
        } else {
          this.fetchInfoWorkout(params.id)
        }
      }
    })
    this.closePreview = this.closePreview.bind(this)
    this.closeAddDrill = this.closeAddDrill.bind(this)
    this.putWorkout = this.putWorkout.bind(this);
  }
  fetchInfoWorkout(id){
    this.loading = true
    this.workoutService.workoutById(id)
    .subscribe(data => {
      this.workout = data.json()[0];
      this.loading = false;
    })
  }

  putWorkout = function(drills){
    drills.forEach(item => {
      this.workout.workoutdetails.push(item)      
    })
    this.loading = true;
    this.requestPut(this.workout.workoutdetails);
  }
  requestPut(drills){
    this.pushDrillsToWorkout(drills)
  
    this.enableAddDrill = false;

    let tempWorkout = Object.assign({},this.workout);
    delete tempWorkout.users;
    delete tempWorkout.workoutdetails;
    this.workoutService.putWorkout(tempWorkout.id,tempWorkout)
    .subscribe(data => {
      this.workout = data.json()[0]
      this.loading = false;
      this.toastr.success("Updated Successfully")
    },
    error => {
      console.log(error)
    })
  }
  pushDrillsToWorkout(drills){
    let tempDrillArr = [];
    drills.forEach(item => {
      if(item.workout_id == undefined){
        tempDrillArr.push(item.id);        
      } else if(item.drill != null) {
        tempDrillArr.push(item.drill_id);        
      }
    });
    this.workout.no_of_drills = Number(tempDrillArr.length) 
    this.workout.drills = tempDrillArr;
  }
  deleteDrill(counter){
    let noPurpose = "main";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
        if (response) {
          this.workout.workoutdetails[counter].delete = true;
          let tempDr = this.workout.workoutdetails[counter];
          let drills = this.workout.workoutdetails.filter(obj => obj !== tempDr);
          this.requestPut(drills);
        }
    })
 }
 preview(counter){
  if(this.workout.workoutdetails[counter].enablePreview == true){
    this.workout.workoutdetails[counter].enablePreview = false
  } else {
    this.workout.workoutdetails[counter].enablePreview = true;    
  }
 }
 closePreview = function(counter){
    this.workout.workoutdetails[counter].enablePreview = false
 }
 openAddDrill(){
   this.enableAddDrill = true;
 }
 closeAddDrill = function(){
  this.enableAddDrill = false;
 }
}
