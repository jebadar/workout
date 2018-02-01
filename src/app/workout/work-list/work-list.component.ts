import { Component, OnInit } from '@angular/core';
import { WorkoutService } from '../workout.service'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { CompleterService, CompleterItem } from 'ng2-completer';
import { Constants } from '../../constants';
import { RequestOptions,Headers } from '@angular/http';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'work-list-component',
  templateUrl: './work-list.component.html',
  styleUrls: ['./work-list.component.css']
})
export class WorkListComponent implements OnInit {

  constructor(
    private workoutService:WorkoutService,
    private completerService:CompleterService,
    private router: Router,
    private toastr: ToastsManager
  ) { }
  loading = false;
  workoutList: Array<string> = [];
  dataService: any;
  api_url = Constants.API_URL + 'users/search?search=';
  accessTokken = this.workoutService.getUserTokken();
  //Filters Variables
  searchStr = "";
  limit = 7;
  page = 0
  loadMoreCheck = false;
  type="";
  duration_to = 180;
  duration_from = 0
  user_id = "";
  //CSS Variables

  ngOnInit() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + this.accessTokken );
    let options = new RequestOptions({ headers:headers, method:"get"});
    this.dataService = this.completerService.remote(this.api_url, null, "name");
    this.dataService.descriptionField("email");
    //this.dataService.imageField("profile_pic.0.picture.path");
    this.dataService.requestOptions(options);
    this.fetchWorkList()
  }

  fetchWorkList(){
    this.loading = true;
    this.workoutService.fetchWorkout(this.limit,this.page,this.type,this.duration_to,this.duration_from,this.user_id)
    .subscribe(data => {
      let list = data.json().userworkout;
      if(this.workoutList.length < 1){
        this.workoutList = list;
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
      this.workoutList.push(item);
    });
  }
  search(){
    this.limit = 7;
    this.page = 0;
    this.loadMoreCheck = false;
    this.workoutList = [];
    this.fetchWorkList();
  }
  edit(id){
    this.router.navigate(['/admin/workout/edit/'+id])
  }
  onSelected(item: CompleterItem) {
    if(item && item.originalObject && item.originalObject.id){
      this.user_id = item.originalObject.id;
    } else{
      this.user_id = null;
    }
  }
  onScroll(){
    if(!this.loadMoreCheck){
      this.page++;
      this.fetchWorkList()
    }
  }
}
