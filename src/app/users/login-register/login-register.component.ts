import { Component, OnInit, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserService } from '../user.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { LoaderComponent } from '../../shared/loader/loader.component'
import { Router } from '@angular/router';

@Component({
  selector: 'login-register-component',
  templateUrl: './login-register.component.html',
  styleUrls: ['../register/register.component.css']
})
export class LoginRegisterComponent implements OnInit {
  // @Input() close;
  constructor(
    private userService: UserService,
    private toastr:ToastsManager,
    private router:Router
  ) {
  }
  registerForm: FormGroup;
  model:any = {};
  loading = false;
  successRegister = false;
  unsuccessRegister = false;
  loginDisable = false;
  registerDisable = false;
  closePage = false;

  ngOnInit() {
    this.initForm()
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
login() {
  if (this.registerForm.get('email').status == 'VALID') {
    this.model.email = this.registerForm.get('email').value;
  } else {
    this.toastr.warning("Email is required, Use valid email address",null);
  }
  if (this.registerForm.get('password').status == 'VALID') {
    this.model.password = this.registerForm.get('password').value;
  } else {
    this.toastr.warning("Enter valid password, Min 5 charaters",null);
  }
  if (this.registerForm.get('password').status == 'VALID' && this.registerForm.get('email').status == 'VALID') {
    this.postLogin();
  }
}
registerUser(){
  this.registerDisable = true;
  this.loading = true;
  this.userService.register(this.model)
  .subscribe(data => {
    let res = data.json();
    this.loading = false;
    this.successRegister = true;
  },error =>{
    this.unsuccessRegister = true;
    this.loading = false;
  })
}
postLogin(){
  this.loading = true;
  this.loginDisable = true;
  this.userService.login(this.model.email, this.model.password)
    .subscribe(data => {
        let res = data;
        let membership = res.user_details[0].membership_status
        if(membership == "admin") {
          this.router.navigate(["admin"]);
        } else {
          this.router.navigate(["/"])
        }
        this.loading = false;
        this.close()
      },error => {
        this.loading = false;
      })
}
navigate(){
  this.close()
}
close(){
  this.closePage = true;
}
}
