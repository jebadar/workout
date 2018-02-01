import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { QuickWorkoutComponent } from '../../workout/quick-workout/quick-workout.component';
import { LoginRegisterComponent } from '../../users/login-register/login-register.component'
import { AddDiyWorkoutComponent } from '../../workout/add-diy-workout/add-diy-workout.component';


@Component({
  selector: 'app-new-workout-wrapper',
  templateUrl: './new-workout-wrapper.component.html',
  styleUrls: ['./new-workout-wrapper.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class NewWorkoutWrapperComponent implements OnInit {

  bsModalRef: BsModalRef;
  showQuick;
  showRegister = false;
  constructor(
    private modalService: BsModalService 
  ) {
    this.closeQuickWorkout = this.closeQuickWorkout.bind(this);
    this.closeReg = this.closeReg.bind(this);
  }

  ngOnInit() {
    this.showQuick=false;
  }
  
  startQuickWorkout(){
    this.showQuick = true;
  }
  closeQuickWorkout = function(){
    this.showQuick = false; 
  }
  showReg(){
    this.showRegister = true
  }
  closeReg = function(){
    this.showRegister = false
  }
}
