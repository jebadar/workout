import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'

@Component({
  selector: 'edit-type-component',
  templateUrl: './edit-type.component.html',
  styleUrls: ['./edit-type.component.css']
})
export class EditTypeComponent implements OnInit {
  @Input() type;
  @Input() counter;
  @Input() edit;
  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager
  ) { }

  ngOnInit() {
  }
  submit()
  {
    if(this.type.name != ""){
      this.putData();
    }else{
      this.toastr.warning("Please enter valid value!")
    }
  }
  cancel() {
    this.edit(this.counter,'false');
  }
  putData() {
    this.edit(this.counter,'pending');
    let type = Object.assign({},this.type) 
    delete type.editFlag;
    this.settingService.putTemplateType(type.id, type)
      .subscribe(data => {
        this.type = data.json();
        this.type.editFlag = 'false'
        this.edit(this.counter,'false');
      })

  }
}
