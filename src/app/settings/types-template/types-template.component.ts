import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";

import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'
import { ConfirmComponent } from "../../shared/confirm/confirm.component";
import { EditTypeComponent } from '../edit-type/edit-type.component'
import { AddTypeComponent } from '../add-type/add-type.component'

@Component({
  selector: 'types-template-component',
  templateUrl: './types-template.component.html',
  styleUrls: ['./types-template.component.css']
})
export class TypesTemplateComponent implements OnInit {

  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager,
    private dialogService: DialogService
  ) { }

  types = [];
  loading;

  ngOnInit() {
    this.fetchTypes()
    this.edit = this.edit.bind(this);
  }
  
  fetchTypes(){
    this.loading=true;
    this.settingService.fetchTemplateType()
    .subscribe(data => {
      this.types = data.json()
      this.types.forEach(item => {
        item.editFlag = 'false'
      });
      this.loading=false;
    })
  }
  edit = function(counter,value){
    this.types[counter].editFlag = value;
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
          this.settingService.deleteTemplateType(id)
            .subscribe(data => {
              this.edit(counter,'false');
              this.types.splice(counter, 1);
            }, err=>{
              this.edit(counter,'false');
            });
        }
      
    })
  }
  add() {
    let noPurpose = "";
    let disposable = this.dialogService.addDialog(AddTypeComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response:any) => {
      //We get dialog result
      if (response != undefined) {
        response.editFlag = 'false';
        this.types.push(response)
      }
      else {
      }
    })
  }
}
