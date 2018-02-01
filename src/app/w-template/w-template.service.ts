import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import qs from 'qs'

@Injectable()
export class WTemplateService {

  constructor(
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) { }

  getTemplateTypes() {
    let observable = this.httpServicesService.get('templatetype');
    return observable
  }

  addTemplate(template) {
    let observable = this.httpServicesService.post('template', JSON.stringify({ template }))
    return observable
  }
  editTemplate(id,template) {
    let observable = this.httpServicesService.put('template/'+id, JSON.stringify({ template }))
    return observable
  }

  getTemplates(limit,page,name,duration,type) {
    let queryStrin = this.generateStr(limit,page,name,duration,type)
    let observable = this.httpServicesService.get('template?',queryStrin);
    return observable
  }

  getTemplate(id) {
    let observable = this.httpServicesService.get('template/' + id);
    return observable
  }

  deleteTemplate(id) {
    let observable = this.httpServicesService.delete('template/' + id);
    return observable
  }

  generateStr(limit, page, name, duration=null, type) {
    let filters = []
    let filtersObj = {
      limit,
      page,
      filter_groups:[]
    }
    

    if(name != null && name!=""){
      filters.push({ key: "name", value: name, operator: "ct" });
    }

    if(type!=null && type>0){
      filters.push({ key: "title_id", value: type, operator: "eq" });
    }

    if(duration!=null){
      filters.push({ key: "duration_id", value: duration, operator: "eq" });
    }
    
    if(filters.length>0){
      filtersObj.filter_groups = [{
        and: true,
        filters: filters
      }]
    }

    
    return qs.stringify(filtersObj);
  }
}
