import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';
import { WorkoutService } from '../workout.service'
import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'user-workout-component',
  templateUrl: './user-workout.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class UserWorkoutComponent implements OnInit {
  @Input() currentUser;
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    private dialogService: DialogService,
    private toastr: ToastsManager        
  ) { }

  workout: Array<any> = [];

  limit = 7;
  page = 0;
  searchStr = "";

  loading = false;
  loadMoreCheck = false;

  ngOnInit() {
    this.fetchWorkout();
  }
  fetchWorkout() {
    this.loading = true;
    this.workoutService.fetchWorkout(this.limit, this.page, "", 180, 0, "", this.searchStr)
      .subscribe(data => {
        let list = data.json().userworkout;
        if(this.workout.length < 1){
          this.workout = list;
        } else if (list.length > 0){
          this.pushWorkout(list);
        } else {
          this.loadMoreCheck = true;
        }
        this.loading = false;
      })
  }
  pushWorkout(list){
    list.forEach(item => {
      this.workout.push(item);
    });
  }
  refreshWorkout(counter){
    this.loading = true;
    this.workout[counter].drills = [0];
    this.workoutService.putWorkout(this.workout[counter].id,"")
      .subscribe(data => {
        let list = data.json().userworkout;
        this.loading = false;
      })
  }
  search() {
    if(this.searchStr != ""){
      this.limit = 7;
      this.page = 0;
      this.workout = [];
      this.fetchWorkout();
    }
  }

  delete(id,counter){
    let noPurpose = "main";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
        if (response) {
          this.deleteWorkout(id,counter);
        }
    })
 }

 deleteWorkout(id,counter){
  this.workout[counter].loading = true;
    this.workoutService.deleteWorkout(id)
    .subscribe( (response) =>{
      let res = response.json();
      this.toastr.success("Deleted Successfully")      
      this.workout[counter].loading = false;
      this.workout.splice(counter,1);
    }, (error) =>{
      this.workout[counter].loading = false;
    })
 }
  onScroll(){
    if(!this.loadMoreCheck){
      this.page++;
      this.fetchWorkout()
    }
  }
  viewWorkout(id) {
    this.router.navigate(['workout/' + id])
  }
  editWorkout(id) {
    this.router.navigate(['workoutEdit/' + id])
  }
}
