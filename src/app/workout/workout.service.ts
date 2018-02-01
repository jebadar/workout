import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Constants } from '../constants';
import qs from 'qs'

@Injectable()
export class WorkoutService {

  constructor(
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) { }

  fetchWorkout(limit, page, type, duration_to,duration_from, user_id,title = "") {
    let tmpFilter = this.generateStr(limit, page, type, duration_to,duration_from, user_id,title)
    let observable = this.httpServicesService.get('userworkout?', tmpFilter)
    return observable
  }
  generateStr(limit, page, type = "", duration_to=0,duration_from=0, user_id = 0,title="") {
    let filters = []
    let filtersObj = {
      limit,
      page,
      filter_groups:[{
        and: true,
        filters: []
      }]
    }
    
    let durationArray = [duration_from,duration_to]


    if(type != null && type!=""){
      filters.push({ key: "workout_type", value: type, operator: "eq" });
    }
    filters.push({ key: "duration", value: durationArray, operator: "bt" });

    if(user_id!=null && user_id>0){
      filters.push({ key: "user_id", value: user_id, operator: "eq" });
    }
    filters.push({ key: "title", value: title, operator: "ct" });
    
    filtersObj.filter_groups[0].filters = filters;
    
    return qs.stringify(filtersObj);
   
  }
  workoutById(id) {
    let observable = this.httpServicesService.get('userworkout/', id)
    return observable
  }
  getUserTokken() {
    let tokken = this.locStoreService.get('user_tokken');
    return tokken;
  }
  fetchDrill(limit, page) {
    let tempFilter = this.generateStr(limit, page)
    let observable = this.httpServicesService.get('drill?', tempFilter)
    return observable
  }
  putWorkout(id, userworkout) {
    let observable = this.httpServicesService.put('userworkout/' + id,JSON.stringify({userworkout}) )
    return observable
  }
  fetchDurations(){
    let observable = this.httpServicesService.get('duration')
    return observable
  }
  fetchTypes(){
    let observable = this.httpServicesService.get('templatetype')
    return observable
  }
  createWorkout(userworkout){
    let observable = this.httpServicesService.post('userworkout',JSON.stringify({userworkout}) )
    return observable
  }
  deleteWorkout(id){
    let observable = this.httpServicesService.delete('userworkout/'+id)
    return observable
  }
}
