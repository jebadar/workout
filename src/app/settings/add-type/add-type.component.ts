import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SettingsService } from '../settings.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export interface ConfirmModel {
  noPurpose:string;
}
@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  noPurpose:string;
  type:any = {};
  loading = false;

  constructor(
    dialogService: DialogService,
    private settingService:SettingsService,
    private toastr:ToastsManager
  ) { 
    super(dialogService);
  }

  ngOnInit() {
  }
  submit()
  {
    this.loading = true;
    if(this.type != "" || this.type != null){
      this.settingService.postTemplateType(this.type)
      .subscribe(data=>{
        this.type = data.json() 
        this.result = this.type;
        this.loading = false;
        this.close();
      }, err=>{
        this.loading = false;
      })
    }
    else{
      this.toastr.warning("Please enter valid value");
    }
  }
}
