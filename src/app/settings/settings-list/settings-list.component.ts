import { Component, OnInit, ViewChild } from '@angular/core';
import { SettingsService } from '../settings.service'
import { Router, ActivatedRoute, Params } from '@angular/router';

import { DiyComponent } from '../diy/diy.component';
import { TemplateComponent } from '../template/template.component';
import { PaymentComponent } from '../payment/payment.component';
import { TypesTemplateComponent } from "../types-template/types-template.component";

@Component({
  selector: 'app-settings-list',
  templateUrl: './settings-list.component.html',
  styleUrls: ['./settings-list.component.css']
})
export class SettingsListComponent implements OnInit {

  @ViewChild(PaymentComponent) paymentConponent: PaymentComponent;
  @ViewChild(DiyComponent) diyComponent: DiyComponent;

  loading = false;
  settings = [];
  generalSettings = [];
  payment = [];
  
  constructor(
    private settingsService:SettingsService,
    private router: Router
  ) { }

  ngOnInit() {
    //Adding a small delay so it does not hang the menu.
    setTimeout(this.fetchSettings.bind(this),0);
  }

  fetchSettings()
  {
    this.loading = true;
    this.settingsService.fetchSettings()
    .subscribe(data => {
      this.settings = data.json().setting;
      this.initSettings();
      this.loading = false;
    })
  }
  
 initSettings()
 {
   this.settings.forEach(item => {
     if(item.name.indexOf('payment_') >= 0)
     {
       item.name = item.name.replace('payment_','');
        this.payment.push(item);
     } else{
       this.generalSettings.push(item);
     }
   });

   if(typeof this.paymentConponent.dataLoaded == "function"){
     this.paymentConponent.dataLoaded();
   }
   if(typeof this.diyComponent.dataLoaded == "function"){
    this.diyComponent.dataLoaded();
  }
 }
}
