import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'
import { EditDurationComponent } from '../edit-duration/edit-duration.component'
import { AddDurationComponent } from '../add-duration/add-duration.component'
import { ConfirmComponent } from "../../shared/confirm/confirm.component";

@Component({
  selector: 'template-component',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css']
})

export class TemplateComponent implements OnInit {
  @Input() setting;
  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager,
    private dialogService: DialogService
  ) { }
  minutes: any = {};
  to: any = {};
  from: any = {};
  templateForm: FormGroup;
  loading = false;
  durations: Array<any> = [];
  ngOnInit() {
    this.fetchDurations()
    this.edit = this.edit.bind(this);
  }
  fetchDurations() {
    this.loading = true;
    this.settingService.getDurations()
      .subscribe(data => {
        this.durations = data.json();
        this.durations.forEach(item => {
          item.editFlag = 'false';
        });
        this.durations.sort((a,b)=>a.minutes-b.minutes);
        this.loading = false;
      })
  }
  edit = function (counter,value) {
    this.durations[counter].editFlag = value;
  }
  delete(id, counter) {
    let noPurpose = "";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
        if (response) {
          this.edit(counter,'pending');
          this.settingService.deleteDuration(id)
            .subscribe(data => {
              this.edit(counter,'false');
              this.durations.splice(counter, 1);
            }, err=>{
              this.edit(counter,'false');
            });
        }
      
    });
  }
  
  add() {
    let noPurpose = "";
    let disposable = this.dialogService.addDialog(AddDurationComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response:any) => {
      //We get dialog result
      if (response != undefined) {
        response.editFlag = 'false';
        this.durations.push(response)
      }
      else {
      }
    })
  }
}
