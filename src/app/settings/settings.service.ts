import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Constants } from '../constants';

@Injectable()
export class SettingsService {

  constructor(
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) { }
  detectmob() {
    if (window.innerWidth <= 800 && window.innerHeight <= 800) {
      return false;
    } else {
      return true;
    }
  }
  fetchSettings(){
    let observable = this.httpServicesService.get('setting')
    return observable
  }
  postSettings(id,setting){
    let observable = this.httpServicesService.put('setting/'+id,JSON.stringify({setting}))
    return observable
  }

  getDurations() {
    let observable = this.httpServicesService.get('duration');
    return observable
  }
  putDuration(id,duration){
    let observable = this.httpServicesService.put('duration/'+id,JSON.stringify({duration}))
    return observable
  }
  postDuration(duration){
    let observable = this.httpServicesService.post('duration',JSON.stringify({duration}))
    return observable
  }
  postSetting(setting){
    let observable = this.httpServicesService.post('setting',JSON.stringify({setting}))
    return observable
  }
  putSetting(id,setting){
    let observable = this.httpServicesService.put('setting/'+id,JSON.stringify({setting}))
    return observable
  }
  deleteDuration(id){
    let observable = this.httpServicesService.delete('duration/'+id)
    return observable
  }
  deleteSetting(id) {
    let observable = this.httpServicesService.delete('setting/'+id)
    return observable
  }
  fetchTemplateType() {
    let observable = this.httpServicesService.get('templatetype')
    return observable
  }
  postTemplateType(templatetype)
  {
    let observable = this.httpServicesService.post('templatetype',JSON.stringify({templatetype}))
    return observable
  }
  putTemplateType(id,templatetype){
    let observable = this.httpServicesService.put('templatetype/'+id,JSON.stringify({templatetype}))
    return observable
  }
  deleteTemplateType(id){
    let observable = this.httpServicesService.delete('templatetype/'+id)
    return observable
  }
}
