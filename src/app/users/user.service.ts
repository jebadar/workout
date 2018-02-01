import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { HttpService } from '../app-services/http.service';
import { LocalStoreService } from '../app-services/local-store.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Constants } from '../constants';
import qs from 'qs';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class UserService {
  returnUrl: string;
  loading = false;
  private accessTokken;
  private user: any = {};

  constructor(
    private httpServicesService: HttpService,
    private locStoreService: LocalStoreService,
    private toastr: ToastsManager
  ) {
    if (locStoreService.get('user_tokken')) {
      this.accessTokken = locStoreService.get('user_tokken');
      this.user = JSON.parse(locStoreService.get('user_detail'));
      this.httpServicesService.setTokken(this.accessTokken);
      this.setUserFlag(this.user)
    }
  }

  // Observable string sources
  private emitChangeSource = new Subject<any>();
  // Observable string streams
  changeEmitted$ = this.emitChangeSource.asObservable();
  // Service message commands
  setUserFlag(change: any) {
      this.emitChangeSource.next(change);
  }

  isAuthenticated() {
    if (this.accessTokken != null) {
      return true;
    }
    else {
      return false;
    }
  }
  login(email: string, password: string) {
    let showErrors = {
      e401: false
    }
    let observable = this.httpServicesService.post('login', JSON.stringify({ email: email, password: password }), showErrors)
      .map((response: Response) => {
        let user = response.json();
        return user;
      });

    observable.subscribe(user => {
      if (user && user.access_token) {
        this.locStoreService.set('user_tokken', user.access_token);
        this.httpServicesService.setTokken(user.access_token);
        this.locStoreService.set('user_detail', JSON.stringify(user.user_details[0]));
        this.user = user.user_details[0];
        this.accessTokken = user.access_token;
        this.toastr.success("Login Successfull.", null);
        this.setUserFlag(this.user);
      }
    }, error => {
      if (error.status == 401) {
        this.toastr.error('Invalid email / password.', 'Oops!', { showCloseButton: true });
      }
    });

    return observable
  }
  logout() {
    //remove user from local storage
    this.locStoreService.remove('user_tokken');
    this.httpServicesService.setTokken('');
    this.user = {};
    this.setUserFlag(null);
  }

  fetchUsers(limit, page, name, email, member_status) {
    let tmpFilter = this.generateStr(limit, page, name, email, member_status)
    let observable = this.httpServicesService.get('users?', tmpFilter)
    return observable
  }
  generateStr(limit, page, name, email, member_status) {
    let filters;
    if(name == "" && email =="" && member_status == "")
    {
      filters = {
        limit,
        page
      }
    }
    else if(name == "" && email =="" && member_status != "")
    {
      filters = {
        limit,
        page,
        filter_groups: [{
          filters: [
            { key: "name", value: name, operator: "ct" },
        { key: "email", value: email, operator: "ct" },
        { key: "membership_status", value: member_status, operator: "eq" }]

      }]
      }
    }
    else{
      filters = {
        limit,
        page,
        filter_groups: [{
          filters: [
            { key: "name", value: name, operator: "ct" },
        { key: "email", value: email, operator: "ct" },
        { key: "membership_status", value: member_status, operator: "ct" }]

      }]
      }
    }
    return qs.stringify(filters)
  }
  fetchUserById(id) {
    let observable = this.httpServicesService.get('users/' + id)
    return observable
  }
  addUser(user) {
    let observable = this.httpServicesService.post('users', JSON.stringify({ user }))
    observable.subscribe(data => {
      if (data.json().errors) {
        this.toastr.error(data.json().errors[0].detail, 'Oops!');
      }
    },
  error => {
    
  })
    return observable
  }
  putUser(user, id) {
    let observable = this.httpServicesService.put('users/' + id, JSON.stringify({ user }))
    observable.subscribe( data => {
      let user = data.json();
      this.locStoreService.set('user_detail', JSON.stringify(user));
      this.user = user;
    })
    return observable
  }
  blockUser(id) {
    let observable = this.httpServicesService.delete('users/' + id)
    return observable
  }
  
  getToken(){
    return this.locStoreService.get('user_tokken');
  }
  getLoggedInUser(){
    return this.user;
  }
  getLoggedInUserId(){
    return this.user.id;
  }
  register(user){
    let observable = this.httpServicesService.post('users/register', JSON.stringify({user}))
    return observable;
  }
  verify(verifyTokken){
    let observable = this.httpServicesService.get('users/verification/' + verifyTokken)
    return observable
  }
  resetPassword(user){
    let observable = this.httpServicesService.post('users/reset', JSON.stringify({user}))
    return observable;
  }
  forgetPassword(email){
    let observable = this.httpServicesService.get('users/forget/', email)
    return observable;
  }
}
