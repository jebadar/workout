import { Component, OnInit } from '@angular/core';
import { LogoutComponent } from '../../users/logout/logout.component'
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseDirective } from 'ngx-bootstrap';
import { SettingsService } from '../../settings/settings.service'
import { CategoryWrapperComponent } from '../../category/category-wrapper/category-wrapper.component';
import { TemplateWrapperComponent } from '../../w-template/template-wrapper/template-wrapper.component';
import { HostListener } from '@angular/core';

import { TitleService } from '../../shared/titleService/titleService';
import { UserService } from "../../users/user.service";



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private router: Router,
    private settingsService:SettingsService,
    private titleService: TitleService,
    private userService: UserService
) 
{ }
  public isCollapsed: boolean = true;
  detectmob = false;
  leftMarginIcon = '';
  color;
  classHover = 'active';
  id = 0;
  title="Dashboard";
  myName="";
  ngOnInit() {
    this.detectmob = this.settingsService.detectmob();
    if(this.detectmob)
    {
      this.leftMarginIcon = '-138'
      this.color = '#212529';
    }
    else{
      
      this.leftMarginIcon = '0';
      this.color = 'transparent'
    }
    let that = this;
    this.updateTitle = this.updateTitle.bind(this);
    this.titleService.changeEmitted$.subscribe(this.updateTitle);
    this.myName = this.userService.getLoggedInUser().name;
  }
  
  updateTitle(title){
    this.title = title;
  }
  collapseMenu()
  {
    this.isCollapsed = !this.isCollapsed;
  }
  
  routerLink(key) {
    switch (key) {
      case 'category':
      {
        this.id = 5
        return this.router.navigate(["admin/category"]);
      }
      case 'user':
        {
          this.id = 4
          return this.router.navigate(["admin/user"]);
        }
      case 'workout':
      {
        this.id = 3
        return this.router.navigate(["admin/workout"]);          
      }
      case 'settings':
      {
        this.id = 6
        return this.router.navigate(["admin/settings"]);          
      }
      case 'drills':
      {
        this.id = 2
        return this.router.navigate(["admin/drills"]);          
      }
      case 'templates':
      {
        this.id = 1
        return this.router.navigate(["admin/templates"]);          
      }
    }
  }
}
