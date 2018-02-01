import { Component, OnInit,Input } from '@angular/core';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { LoaderComponent } from '../../shared/loader/loader.component'
import { Router } from '@angular/router';
import { Constants } from  '../../constants' 

@Component({
  selector: 'register-component',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
@Input() purpose
@Input() key: string;
@Input() close;
  constructor(
    private userService: UserService,
    private toastr:ToastsManager,
    private router:Router
  ) {
  }

  assetsUrl = Constants.ASSET_URL;
  registerForm: FormGroup;
  model: any = {};
  loading = false;
  successRegister = false;
  heading = "";
  verifyResponse = false;
  ngOnInit() {
    this.initText(this.purpose)
    this.initForm();
  }
  initText(flag){
    if(flag == "register"){
      this.heading = "register";
    } else if(flag == "verify"){
      this.heading = "email verification";
      this.verify(this.key)
    } else if (flag == 'reset'){
      this.heading = "password reset";
      this.verify(this.key)
    }
  }
  initForm(){
    this.registerForm = new FormGroup({
      name: new FormControl(null, [
        Validators.required,
      ]),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^.{5,}$")
      ]),
      confirmPassword: new FormControl(null, [
        Validators.required,
        Validators.pattern("^.{5,}$")
      ]),
      landline: new FormControl(null, [
        Validators.required
      ])
    });
  }
  submit() {
    if (this.registerForm.get('email').status == 'VALID') {
      this.model.email = this.registerForm.get('email').value;
    } else {
      this.toastr.warning("Email is required, Use valid email address", null);
    }
    if (this.registerForm.get('name').status == 'VALID') {
      this.model.name = this.registerForm.get('name').value;
    } else {
      this.toastr.warning("Name is required, Use valid Name", null);
    }
    if (this.registerForm.get('landline').status == 'VALID') {
      this.model.cell_num = this.registerForm.get('landline').value;
    } else {
      this.toastr.warning("Phone number is required, Use valid Number", null);
    }
    if (this.registerForm.get('password').status == 'VALID') {
      this.model.password = this.registerForm.get('password').value;
    } else {
      this.toastr.warning("Password is required, Enter valid password", null);
    }
    if (this.registerForm.get('confirmPassword').status == 'VALID') {
      this.model.confirmPassword = this.registerForm.get('confirmPassword').value;
    } else {
      this.toastr.warning("Password is required, Enter valid confirm password", null);
    }
    if(this.registerForm.status == 'VALID' && this.model.password == this.model.confirmPassword){
      this.registerUser();
    } else {
      this.toastr.warning("Password do not match!", null);
     }
  }
  registerUser(){
    this.loading = true;
    this.userService.register(this.model)
    .subscribe(data => {
      let res = data.json();
      this.loading = false;
      this.successRegister = true;
    })
  }
  verify(accessToken) {
    this.loading = true;
    this.userService.verify(accessToken)
      .subscribe(data => {
        this.verifyResponse = true;
        this.loading = false;
      },
      err => {
      })
  }

  navigate(){
    this.router.navigate(['/']);
    this.close()
  }
  closeBox(){
    this.close()
  }
}
