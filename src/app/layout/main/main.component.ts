import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseDirective } from 'ngx-bootstrap';

import { LogoutComponent } from '../../users/logout/logout.component';
import { Constants } from  '../../constants'
import { UserService } from '../../users/user.service'


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['../index-main/index-main.component.css']
})
export class MainComponent implements OnInit {

  assetsUrl = Constants.ASSET_URL;

  constructor(
    private router: Router,
    private userSerive:UserService
  ) { }

  public isCollapsed: boolean = true;

  user:any = {};  

  ngOnInit() {
    this.user = this.userSerive.getLoggedInUser();
    if(this.user.name == undefined){
      this.updateUser(null);
    }
    this.updateUser = this.updateUser.bind(this);
    this.userSerive.changeEmitted$.subscribe(this.updateUser);
}
collapseMenu()
{
  this.isCollapsed = !this.isCollapsed;
}

updateUser(user){
  this.user = user;
}
 navigate(value){
  this.router.navigate([value]);
 }
}
