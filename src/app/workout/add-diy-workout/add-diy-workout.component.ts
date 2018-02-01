import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";

import { WorkoutService } from '../workout.service'
import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';
import { UserService } from '../../users/user.service'
import { Constants } from '../../constants'

@Component({
  selector: 'add-diy-workout-component',
  templateUrl: './add-diy-workout.component.html',
  styleUrls: ['../../users/register/register.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AddDiyWorkoutComponent implements OnInit {
  @Input() close;
  constructor(
    private workoutService: WorkoutService,
    private router: Router,
    public toastr: ToastsManager,
    private userService:UserService
  ) { }

  assetsUrl = Constants.ASSET_URL;
  workoutForm: FormGroup;

  model:any = {};

  loading = false;

  ngOnInit() {
    this.workoutForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ])
    });
  }
  create(){
    if (this.workoutForm.get('title').status == 'VALID') {
      this.model.title = this.workoutForm.get('title').value;
    } else {
      this.toastr.warning("Title is required, Enter valid title",null);
    }
    if(this.workoutForm.status == 'VALID'){
      this.submit()
    }
  }
  submit(){this.loading = true;
    this.model.workout_type = "diy"
    this.model.user_id = this.userService.getLoggedInUserId();
    this.model.drills = []
    this.workoutService.createWorkout(this.model)
    .subscribe(data => {
      let res = data.json()[0];
      this.loading = false;
      this.toastr.success("Created Successfully");
      this.router.navigate(['workoutEdit/'+res.id])
    }, error => {
      this.loading = false;
    })
  }
  navigate(){
    this.close()
  }
}
