import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'

@Component({
  selector: 'diy-component',
  templateUrl: './diy.component.html',
  styleUrls: ['./diy.component.css']
})
export class DiyComponent implements OnInit {
  @Input() setting;
  editMode = false;
  loading = false;
  loaded = false;
  
  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
    
  }

  dataLoaded(){
    this.loaded=true;
  }

  submit()
  {
    this.postData();
  }
  postData()
  {
    this.loading = true;
    this.setting.forEach(element => {
      element.loading = true;
      this.saveSetting(element);
    }); 
  }

  checkAllSettingsUpdated(){
    let loading = false;
    this.setting.forEach(item=>{
      if(item.loading == true){
        this.loading=true;
      }
    })

    this.editMode = this.loading = loading;
  }
  saveSetting(settingData){
    this.settingService.postSettings(settingData.id,settingData)
    .subscribe(data => {
      settingData = data.json();
      settingData.loading = false;
      this.checkAllSettingsUpdated();
    },
    error => {
      settingData.loading = false;
      this.checkAllSettingsUpdated();
    })
  }

  edit()
  {
    this.editMode = !this.editMode;
  }
}
