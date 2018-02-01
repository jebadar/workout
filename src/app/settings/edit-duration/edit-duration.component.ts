import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'
import { SettingsService } from '../settings.service'

@Component({
  selector: 'edit-duration-component',
  templateUrl: './edit-duration.component.html',
  styleUrls: ['./edit-duration.component.css']
})
export class EditDurationComponent implements OnInit {
  @Input() duration;
  @Input() counter;
  @Input() edit;
  constructor(
    private settingService: SettingsService,
    private toastr: ToastsManager
  ) { }
  durationForm: FormGroup;
  ngOnInit() {
    this.durationForm = new FormGroup({
      minutes: new FormControl(null, [
      ]),
      free_time_to: new FormControl(null, [
      ]),
      free_time_from: new FormControl(null, [
      ])
    });
  }
  cancel() {
    this.edit(this.counter,'false');
  }
  submit() {
    if (this.durationForm.get('minutes').dirty) {
      this.duration.minutes = this.durationForm.get('minutes').value;
    }
    else {
    }
    if (this.durationForm.get('free_time_to').dirty) {
      this.duration.free_time_to = this.durationForm.get('free_time_to').value;
    }
    else {
    }
    if (this.durationForm.get('free_time_from').dirty) {
      this.duration.free_time_from = this.durationForm.get('free_time_from').value;
    }
    else {
    }
    if (this.durationForm.status == 'VALID') {
      this.putData()
    }

  }

  putData() {
    this.edit(this.counter,'pending');
    let duration = Object.assign({},this.duration) 
    delete duration.editFlag;
    this.settingService.putDuration(duration.id, duration)
      .subscribe(data => {
        this.duration = data.json();
        this.duration.editFlag = 'false'
        this.edit(this.counter,'false');
      })

  }
}
