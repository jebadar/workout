import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

import { LoaderComponent } from '../../shared/loader/loader.component'
import { UserService } from '../user.service'

@Component({
  selector: 'user-info-box-component',
  templateUrl: './info-box.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class InfoBoxComponent implements OnInit {

  constructor(
    private userService: UserService,
    private toastr: ToastsManager
  ) { }

  user: any = {};

  editFlag = false;
  loading = false;

  userForm: FormGroup;

  ngOnInit() {
    this.user = this.userService.getLoggedInUser();
    this.userForm = new FormGroup({
      name: new FormControl(null),
      landline: new FormControl(null),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^.{5,}$")
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern("^.{5,}$")
      ])

    });

  }
  edit() {
    this.editFlag = !this.editFlag;
  }
  submit() {
    if (this.userForm.get('password').status == 'VALID') {
      this.user.password = this.userForm.get('password').value;
      if (this.user.password == this.userForm.get('confirmPassword').value) {
        this.basicForm();
      } else {
        this.toastr.warning("Passwords do not match");
      }
    } else if(this.userForm.get('password').pristine){
      this.basicForm();
    }  else {
      this.toastr.warning("Password is required, Enter valid password", null);
    }
  }
  basicForm() {
    if (this.user.name != null && this.user.cell_number != null) {
      this.user.cell_number = this.user.cell_number.toString();
      this.postOldUser()
    } else {
      this.toastr.warning("Invalid value");
    }
  }
  postOldUser() {
    this.loading = true;
    this.userService.putUser(this.user, this.user.id)
      .subscribe(data => {
        this.user = data.json()
        this.loading = false;
        this.toastr.success('Updated Sucessfully')
        this.editFlag = !this.editFlag;
      }, error => {
        this.loading = false;
      })
  }
}
