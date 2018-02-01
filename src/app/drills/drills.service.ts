import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Constants } from '../constants';
import qs from 'qs';

@Injectable()
export class DrillsService {

  constructor(
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) { }

  addDrill(drill) {
    let observable = this.httpServicesService.post('drill', JSON.stringify({ drill }))
    return observable
  }

  getDrills(limit, page, name, major, minor, sub) {
    let str = this.generateStr(limit, page, name, major, minor, sub);
    // console.log(str);
    // let str="filter_groups%5B0%5D%5Bfilters%5D%5B0%5D%5Bkey%5D=name&filter_groups%5B0%5D%5Bfilters%5D%5B0%5D%5Bvalue%5D=bilal&filter_groups%5B0%5D%5Bfilters%5D%5B0%5D%5Boperator%5D=eq";
    let observable = this.httpServicesService.get('drill?', str);
    return observable
  }

  getDrillById(id) {
    let observable = this.httpServicesService.get('drill/' + id);
    return observable
  }

  updateDrill(id, drill) {
    let observable = this.httpServicesService.put('drill/' + id, JSON.stringify({ drill }))
    return observable
  }
  deleteDrill(id){
    let observable = this.httpServicesService.delete('drill/' + id)
    return observable
  }

  generateStr(limit, page, name, major, minor, sub) {
    
    let filters = []
    let filtersObj = {
      limit,
      page,
      filter_groups:[]
    }


    if(name != null){
      filters.push({ key: "name", value: name, operator: "ct" });
    }

    if(major != null){
      filters.push({ key: "major_id", value: major, operator: "eq" });
    }

    if(minor != null){
      filters.push({ key: "minor_id", value: minor, operator: "eq" });
    }

    if(sub != null){
      filters.push({ key: "sub_id", value: sub, operator: "eq" });
    }

    if(filters.length>0){
      filtersObj.filter_groups = [{
                                    and: true,
                                    filters
                                  }]
    }
    
    return qs.stringify(filtersObj)
  }
}
