import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';
import { WorkoutService } from '../workout.service'
import { WTemplateService } from '../../w-template/w-template.service';
import { CategoryService } from '../../category/category.service';
import { UserService } from '../../users/user.service'
import { SettingsService } from '../../settings/settings.service'

@Component({
  selector: 'app-quick-workout',
  templateUrl: './quick-workout.component.html',
  styleUrls: ['./quick-workout.component.css']
})

export class QuickWorkoutComponent implements OnInit {
  @Input() close;

  types = [];
  templates = [];
  durations = [];
  minors:any = {};
  subs = [];
  finalSubs = [];
  categories;
  scroll = "hidden"

  duration=null;
  type=null;
  template=null;
  minor=null;
  sub=null;

  durationSelected = false;
  loading = false;
  drillSelected = false;
  editCheck = false;
  detectMobile = false;

  view = 1;
  stepsComplete=0;
  templatesLoaded=false;
  drillCounter = 0;


  constructor(
    private workoutService:WorkoutService,
    private templateService:WTemplateService,
    private caetgoryService:CategoryService,
    private router: Router,
    private userService: UserService,
    private toastr: ToastsManager,
    private settingsService:SettingsService
  ) { }
  
  ngOnInit() {
    this.fetchTemplates();
    this.detectMobile = this.settingsService.detectmob();
  }

  fetchTemplates(){
    this.templateService.getTemplates(100,0,null,null,null)
    .subscribe(data => {
      this.templates = data.json().template;
      this.templates.forEach(item=>{
        this.addUniqueDuration(item.templateduration);
      });
      this.templatesLoaded = true
    })
    
  }

  addUniqueType(type){
    let found = this.types.filter(item=>{
      if(item.id===type.id){return item;}
    })
    if(found.length==0){
      this.types.push(type);
    }
  }
  addUniqueDuration(duration){
    let found = this.durations.filter(item=>{
      if(item.id===duration.id){return item;}
    })
    if(found.length==0){
      this.durations.push(duration);
    }
  }

  selectDuration(id){
    this.template=null;
    this.stepsComplete = 0;
    
    if(this.duration){
      this.duration.selected=false;
    }
    if(this.type){
      this.type.selected=false;
      this.type = null;
    }
    this.durations.forEach(item=>{
      if(item.id==id){
        this.duration = item;
      }
    })
    this.duration.selected = true;
    this.types = [];
    this.templates.forEach(item=>{
      if(item.duration_id==id){
        this.addUniqueType(item.type);
      }
    });

    this.durationSelected=true;
  }

  selectType(id){
    if(this.type){
      this.type.selected=false;
    }
    this.types.forEach(item=>{
      if(item.id==id){
        this.type = item;
      }
    });
    this.type.selected=true;

    this.templates.forEach(item=>{
      if(
        item.type.id === this.type.id
        && item.duration_id === this.duration.id
      ){
        this.template = item;
        this.stepsComplete = 1;
      }
    });
  }

  addUniqueMinors(){
    this.subs = [];
    this.minors = [];
    this.editCheck = false;
    this.drillSelected = false
    this.template.details.forEach(item => {
      let found = this.minors.filter(element=>{
        if(element.id===item.id){return element;}
      })
      if(found.length==0){
        this.minors.push(item);
      }
    });
    if(this.minors.length > 7){
      this.scroll = "scroll"
    }
  }
  selectMinor(id,counter){
  this.drillCounter = counter;
  if(this.minor){
    this.minor.selected = false;
  }
  this.minor = this.minors[counter]
  this.minor.selected = true;
  this.drillSelected = true;
  this.subCategory(counter)
  }
  subCategory(counter){
    this.subs = this.minors[counter].minor.drill_subs;
  }
  changeFlagOfSub(minorId,id){
    var counter = 0;
    this.minors.forEach(item => {
      if(counter==this.drillCounter && item.minor.drill_subs.length > 0){
        item.minor.drill_subs.forEach(element => {
          if(element.id == id){
            if(element.selected){
              element.selected = true
            } else {
              element.selected = false;
            }
          } else if(element.selected) {
            element.selected = false;
          }
        });
      }
      counter++
    })
    var count = 0;
    this.finalSubs.forEach(data => {
      count++;
    }) 
    if(this.drillCounter < this.minors.length-1){
      this.drillCounter++
    } else if(count == this.minors.length) {
      this.stepsComplete = 2;
    } else if(count != this.minors.length){
      this.stepsComplete = 1;
    }
    if(this.drillCounter < this.minors.length){
      let minrId = this.minors[this.drillCounter].minor_id
      this.selectMinor(minrId,this.drillCounter);
    }
  }
  selectSub(id,counter){
    this.pushSub(id);
    this.subs[counter].selected = !this.subs[counter].selected
    this.changeFlagOfSub(this.minor.minor_id,id);
    if(this.editCheck){
      this.show(3)
    }
  }
  pushSub(id){
    this.minors[this.drillCounter].minor.drill_subs.forEach(item => {
      if(item.id == id){
        item.minor = this.minors[this.drillCounter].minor
        this.finalSubs[this.drillCounter] = item
      }
    })
  }
  editDrill(id,counter){
    this.view = 2;
    this.editCheck = true;
    this.selectMinor(id,counter)
  }
  generateWorkout(){
    let workout:any = {};
    let user = this.userService.getLoggedInUser()
    workout.workout_type = "quick";
    workout.drills = [];
    this.finalSubs.forEach(item => {
      workout.drills.push(item.id)
    })
    workout.free_time = this.duration.free_time_from;
    workout.title="quick";
    workout.user_id = ""
    workout.duration = this.duration.minutes
    workout.no_of_drills = this.finalSubs.length;
    this.loading = true;
    this.workoutService.createWorkout(workout)
    .subscribe(data => {
      let res = data.json()[0];
      this.loading = false;
      this.toastr.success("Workout Created Successfully")
      this.close()
      this.router.navigate(['']);
    }, error => {
      this.loading = false;
    })
  }


  closeme(e){
    this.close();
  }

  show(view){
    this.view = parseInt(view);
    if(this.view == 2){
      this.addUniqueMinors();
    }
  }

  ignoreClick(e){
    e.stopPropagation();
  }
}
