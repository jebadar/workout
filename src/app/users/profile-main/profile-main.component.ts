import { Component, OnInit } from '@angular/core';
import { InfoBoxComponent } from '../../users/info-box/info-box.component';
import { UserWorkoutComponent } from '../../workout/user-workout/user-workout.component';
import { UserService } from '../../users/user.service'
import { NewWorkoutWrapperComponent } from '../new-workout-wrapper/new-workout-wrapper.component';

@Component({
  selector: 'app-profile-main',
  templateUrl: './profile-main.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class ProfileMainComponent implements OnInit {

  constructor(
    private userService:UserService
  ) { }

  user:any = {};

  enableProfile = false;
  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
  }
  showProfile(){
     this.enableProfile = !this.enableProfile;
   }
}
