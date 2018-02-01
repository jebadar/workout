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
  selector: 'app-add-payment',
  templateUrl: './add-payment.component.html',
  styleUrls: ['./add-payment.component.css']
})
export class AddPaymentComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {

  noPurpose:string;
  setting:any = {};
  loading = false;
  paymentForm:FormGroup
  constructor(
    dialogService: DialogService,
    private settingService:SettingsService,
    private toastr:ToastsManager
) {
    super(dialogService);
    this.paymentForm = new FormGroup({
      type: new FormControl(null, [
        Validators.required
      ]),
      duration: new FormControl(null, [
        Validators.required
      ]),
      amount: new FormControl(null, [
        Validators.required
      ])
    });
   }

  ngOnInit() {
  }
  submit() {
    if (this.paymentForm.get('type').dirty) {
      this.setting.name = this.paymentForm.get('type').value;
    }
    else {
      this.toastr.warning('Type is required', 'Oops!');
    }
    if (this.paymentForm.get('duration').dirty) {
      this.setting.duration = this.paymentForm.get('duration').value;
    }
    else {
      this.toastr.warning('Duration is required', 'Oops!');
    }
    if (this.paymentForm.get('amount').dirty) {
      this.setting.value = this.paymentForm.get('amount').value.toString();
    }
    else {
      this.toastr.warning('Amount is required', 'Oops!');
    }
    if (this.paymentForm.status == 'VALID') {
      this.postData()
    }
  }
  postData()
  {
    this.loading = true;
    this.setting.name = 'payment_'+this.setting.name;
    this.settingService.postSetting(this.setting)
    .subscribe(data =>{
      this.setting = data.json()
      this.setting.name = this.setting.name.replace('payment_','');
      this.result = this.setting;
      this.loading = false;
      this.close();
    })

  }
}
