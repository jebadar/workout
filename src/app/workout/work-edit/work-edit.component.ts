import { Component, OnInit } from '@angular/core';

import { Router, ActivatedRoute, Params } from '@angular/router';
import { WorkoutService } from '../workout.service'
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AddDrillComponent } from '../add-drill/add-drill.component';
import { ConfirmComponent } from "../../shared/confirm/confirm.component";

@Component({
  selector: 'work-edit-component',
  templateUrl: './work-edit.component.html',
  styleUrls: ['./work-edit.component.css']
})
export class WorkEditComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private toastr: ToastsManager,
    private router: Router,
    private dialogService: DialogService
  ) { }
  workout_id;
  text;
  workout:any={};
  email = "";
  workoutForm:FormGroup;
  loading = false;
  widthCard = "0%";
  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.workout_id = params.id;
        if (this.workout_id == undefined || this.workout_id == 'null') {
          this.text = "ADD WORKOUT"
        } else {
          this.fetchInfoWorkout(params.id)
        }
      }
    })
  }
  fetchInfoWorkout(id){
    this.loading = true
    this.workoutService.workoutById(id)
    .subscribe(data => {
      this.text = "EDIT WORKOUT"
      this.workout = data.json()[0];
      this.email = this.workout.users.email;
      this.loading = false;
    })
  }
  addDrill(){
   let drills:any = {};
    let disposable = this.dialogService.addDialog(AddDrillComponent, {
      drills: drills
    })
    disposable.subscribe((response:any) => {
      //We get dialog result
      if (response != undefined) {
        if(this.workout.workoutdetails.length > 0){
          let alreadyExistCount = 0;
          let lengthResponse = response.length; 
          let count=0
          while(count<lengthResponse){
            let dr = this.workout.workoutdetails.find(x => x.drill_id == response[count].id)
            if(dr != null){
              response.splice(dr,1);
              alreadyExistCount++;
              lengthResponse--;
              this.toastr.warning(dr.drill.name+" was aleady in workout");
            } else{
              count++
            }
          }
          if(alreadyExistCount > 0){
            // this.toastr.warning(alreadyExistCount+" No. of drills from selection already exist!");
          }
          this.workout.workoutdetails.forEach(item => {
            if(item.drill != null){
              response.push(item.drill);
            }
          });
        }
        this.putWorkout(response)
      } else {
      }
    });
  }
  putWorkout(drills){
      this.pushDrillsToWorkout(drills)
    
    let tempWorkout = Object.assign({},this.workout);
    delete tempWorkout.users;
    delete tempWorkout.workoutdetails;
    this.loading = true;
    this.workoutService.putWorkout(tempWorkout.id,tempWorkout)
    .subscribe(data => {
      this.workout = data.json()[0]
      this.loading = false;
    },
  error => {
    console.log(error)
  })
  }
  pushDrillsToWorkout(drills){
    let tempDrillArr = [];
    drills.forEach(item => {
      tempDrillArr.push(item.id);
    });
    this.workout.no_of_drills = tempDrillArr.length + this.workout.no_of_drills
    this.workout.drills = tempDrillArr;
  }
  removeDrill(drillId){
    let noPurpose ="";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
      if (response != undefined) {
        if(response) {
          let tempDr = this.workout.workoutdetails.find(x=> x.drill_id == drillId)
          this.workout.workoutdetails = this.workout.workoutdetails.filter(obj => obj !== tempDr);
          let drills = [];
          this.workout.workoutdetails.forEach(item => {
            if(item.drill != null){
              drills.push(item.drill);
            }
          });
          this.putWorkout(drills);
         }
      }
  })

  }
}
