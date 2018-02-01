import { Component, OnInit,Input } from '@angular/core';
import { SettingsService } from '../settings.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'edit-payment-component',
  templateUrl: './edit-payment.component.html',
  styleUrls: ['./edit-payment.component.css']
})
export class EditPaymentComponent implements OnInit {
@Input() setting;
@Input() counter;
@Input() edit;
  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager
  ) {
    this.settingForm = new FormGroup({
      amount: new FormControl(null, [
      ]),
      duration: new FormControl(null, [
      ]),
      type: new FormControl(null, [
      ])
   })
  }
settingForm:FormGroup;
  ngOnInit() {

  }
  submit() {
    if (this.settingForm.get('type').dirty) {
      this.setting.name = this.settingForm.get('type').value;
    }
    else {
    }
    if (this.settingForm.get('duration').dirty) {
      this.setting.duration = this.settingForm.get('duration').value;
    }
    else {
    }
    if (this.settingForm.get('amount').dirty) {
      this.setting.value = this.settingForm.get('amount').value;
    }
    else {
    }
    if (this.settingForm.status == 'VALID') {
      this.putData()
    }

  }
  cancel()
  {
    this.edit(this.counter,'false');
  }
  putData() {
    this.edit(this.counter,'pending');
    let setting = Object.assign({},this.setting) ;
    delete setting.editFlag;
    setting.name = 'payment_'+setting.name;
    this.settingService.putSetting(setting.id, setting)
      .subscribe(data => {
        this.setting = data.json();
        this.setting.name = this.setting.name.replace('payment_','');
        this.setting.editFlag = 'false'
        this.edit(this.counter,'false');
      })

  }
}
