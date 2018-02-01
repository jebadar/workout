import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AddPaymentComponent } from "../add-payment/add-payment.component";
import { ConfirmComponent } from "../../shared/confirm/confirm.component";

@Component({
  selector: 'payment-component',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  @Input() setting;

  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager,
    private dialogService: DialogService
  ) { }

  loading = false;
  loaderMarginLeft
  loaded = false;

  
  ngOnInit() {
    this.loaded = this.loaded || false;
    this.edit = this.edit.bind(this);

  }

  dataLoaded() {
    this.initSetting();
    this.loaded = true
  }

  initSetting() {
    this.setting.forEach(item => {
      item.editFlag = "false";
    });
  }
  
  add() {
    let noPurpose = "";
    let disposable = this.dialogService.addDialog(AddPaymentComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response: any) => {
      if (response != undefined) {
        response.editFlag = "false";
        this.setting.push(response)
      }
      else {
      }
    })
  }
  edit = function (key, value) {
    this.setting[key].editFlag = value;
  }
  delete(id, counter) {
    let noPurpose = "";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
      if (response != undefined) {
        if (response) {
          this.edit(counter, 'pending')
          this.settingService.deleteSetting(id)
            .subscribe(data => {
              this.setting.splice(counter, 1);
            })
        }
      }
      else {
      }
    })

  }
}
