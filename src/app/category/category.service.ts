import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
// import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Constants } from '../constants';
import 'rxjs/add/operator/share';

@Injectable()
export class CategoryService {

  categories;
  fetchObservable$;
  inProgress;
  fetchObservableSubject = new Subject();

  constructor (
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) { 
    this.inProgress=false;
  }

  fetchMajor() {
    
    return new Observable(observer => {
      if(this.locStoreService.get("categories")){
        let categories = this.locStoreService.get("categories");
        this.categories = JSON.parse(categories);
        setTimeout(()=>{observer.next(this.categories)},0);
      }

      this.httpServicesService.get('drillmajor')
      .subscribe(data => {
        this.categories = data.json()
        this.locStoreService.set("categories",JSON.stringify(this.categories));
        observer.next(this.categories);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });

  }

  putMajor(id, drillmajor) {
    
    return new Observable(observer => {
      this.httpServicesService.put('drillmajor/' + id, JSON.stringify({ drillmajor }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });

  }
  putMinor(id, drillminor) {

    return new Observable(observer => {
      this.httpServicesService.put('drillminor/' + id, JSON.stringify({ drillminor }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });
    
  }
  putSub(id, drillsub) {
    // let observable = this.httpServicesService.put('drillsub/' + id, JSON.stringify({ drillsub }))
    // return observable

    return new Observable(observer => {
      this.httpServicesService.put('drillsub/' + id, JSON.stringify({ drillsub }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });
  }

  addMajor(drillmajor) {
    return new Observable(observer => {
      this.httpServicesService.post('drillmajor', JSON.stringify({ drillmajor }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });
  }

  addMinor(drillminor) {
    return new Observable(observer => {
      this.httpServicesService.post('drillminor', JSON.stringify({ drillminor }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });
  }
  addSub(drillsub) {
    return new Observable(observer => {
      this.httpServicesService.post('drillsub', JSON.stringify({ drillsub }))
      .subscribe(dataUpdate => {
        observer.next(dataUpdate);
        observer.complete();
      }, err=>{
        observer.error(err);
      });
    });
  }

  deleteMajor(id) {
    return this.httpServicesService.delete('drillmajor/' + id);
  }
  deleteMinor(id) {
    return this.httpServicesService.delete('drillminor/' + id)
  }
  deleteSub(id) {
    return this.httpServicesService.delete('drillsub/' + id)
  }
}
