import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BrowserModule } from '@angular/platform-browser';

export interface ConfirmModel {
  noPurpose:string;
}

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrls: ['./confirm.component.css']
})
export class ConfirmComponent  extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  noPurpose:string;
  constructor(
    dialogService: DialogService
) {
    super(dialogService);
   }

  ngOnInit() {
    this.result = false;
  }
  confirm()
  {
    this.result = true;
    this.close();
  }
}
