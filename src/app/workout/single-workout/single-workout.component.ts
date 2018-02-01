import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { Constants } from  '../../constants'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { WorkoutService } from '../workout.service'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'single-workout-component',
  templateUrl: './single-workout.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class SingleWorkoutComponent implements OnInit {
  assetsUrl = Constants.ASSET_URL;
  constructor(
    private activatedRoute: ActivatedRoute,
    private workoutService: WorkoutService,
    private router: Router,
    private dialogService: DialogService,
    private toastr: ToastsManager    
  ) { }

  workout:any = {};
  drills:Array<any> = [];
  
  workout_id;
  
  loading = false;

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
  }
  fetchInfoWorkout(id){
    this.loading = true
    this.workoutService.workoutById(id)
    .subscribe(data => {
      this.workout = data.json()[0];
      this.drills = this.workout.workoutdetails;
      this.loading = false;
    }, (error) => {
      if(error.status == 404){
      this.router.navigate(['/'])      
      }
    })
  }
  edit(id){
    this.router.navigate(['workoutEdit/'+id])
  }
  delete(id){
    let noPurpose = "main";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
        if (response) {
          this.deleteWorkout(id);
        }
    })
 }
 deleteWorkout(id){
  this.loading = true;
    this.workoutService.deleteWorkout(id)
    .subscribe( (response) =>{
      let res = response.json();
      this.toastr.success("Deleted Successfully")
      this.router.navigate(['/'])
      this.loading = false;
    }, (error) =>{
      this.loading = false;
    })
 }
}
