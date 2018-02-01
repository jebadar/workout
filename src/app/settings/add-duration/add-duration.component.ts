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
  selector: 'app-add-duration',
  templateUrl: './add-duration.component.html',
  styleUrls: ['./add-duration.component.css']
})
export class AddDurationComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

noPurpose:string;
durationForm:FormGroup
constructor(dialogService: DialogService,
  private settingService:SettingsService,
private toastr:ToastsManager) {
  super(dialogService);
  this.durationForm = new FormGroup({
    minutes: new FormControl(null, [
      Validators.required
    ]),
    free_time_to: new FormControl(null, [
      Validators.required
    ]),
    free_time_from: new FormControl(null, [
      Validators.required
    ])
  });
}
loading = false;
duration:any = {};
  ngOnInit() {
  }
  submit() {
    if (this.durationForm.get('minutes').dirty) {
      this.duration.minutes = this.durationForm.get('minutes').value.toString();
    }
    else {
      this.toastr.warning('Minutes are required', 'Oops!');
    }
    if (this.durationForm.get('free_time_to').dirty) {
      this.duration.free_time_to = this.durationForm.get('free_time_to').value.toString();
    }
    else {
      this.toastr.warning('Free minutes To is required', 'Oops!');
    }
    if (this.durationForm.get('free_time_from').dirty) {
      this.duration.free_time_from = this.durationForm.get('free_time_from').value.toString();
    }
    else {
      this.toastr.warning('Free minutes From is required', 'Oops!');
    }
    if (this.durationForm.status == 'VALID') {
      if(this.duration.free_time_from > this.duration.free_time_to)
      {
        this.toastr.warning('Free minutes From must be less then Free minutes To!', 'Oops!');
      }else{
        this.postData()        
      }
    }
  }
  postData()
  {
    this.loading = true;
    this.settingService.postDuration(this.duration)
    .subscribe(data =>{
      this.duration = data.json()
      this.result = this.duration;
      this.loading = false;
      this.close();
    }, err=>{
      this.loading = false;
    })

  }
}