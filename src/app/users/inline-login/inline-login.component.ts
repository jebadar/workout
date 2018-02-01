import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { RegisterComponent } from '../register/register.component';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { Constants } from  '../../constants'

@Component({
  selector: 'inline-login-component',
  templateUrl: './inline-login.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class InlineLoginComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    public toastr: ToastsManager,
    private dialogService:DialogService
  ) { }

  assetUrl = Constants.ASSET_URL;

  loginForm: FormGroup;
  loading = false;
  model: any = {};
  resetCheck = false;
  successReset = false;
  showRegister = false;
  ngOnInit() {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.pattern("^.{5,}$")
      ])
    });
    this.closeRegister = this.closeRegister.bind(this)
  }
  submit(){
    if(this.resetCheck){
      this.reset();
    } else {
      this.login();
    }
  }
  submitRegister(){
    if(this.resetCheck){
      this.resetEmail();
    } else {
      this.register();
    }
  }
  login() {
    if (this.loginForm.get('email').status == 'VALID') {
      this.model.email = this.loginForm.get('email').value;
    } else {
      this.toastr.warning("Email is required, Use valid email address",null);
    }
    if (this.loginForm.get('password').status == 'VALID') {
      this.model.password = this.loginForm.get('password').value;
    } else {
      this.toastr.warning("Enter valid password, Min 5 charaters",null, { tapToDismiss: true, closeButton:true,showDuration: 300, hideDuration: 1000,timeOut: 5000,extendedTimeOut: 1000,showCloseButton: true});
    }
    if (this.loginForm.status == 'VALID') {
      this.postLogin();
    }
  }
  reset(){
    if (this.loginForm.get('email').status == 'VALID') {
      this.model.email = this.loginForm.get('email').value;
    } else {
      this.toastr.warning("Email is required, Use valid email address",null);
    }
    if(this.model.email != null){
      this.postReset();
    }
  }
  postReset(){
    this.loading = true;
    this.userService.forgetPassword(this.model.email)
    .subscribe(data => {
      this.loading = false;
      this.successReset = true;
    })
  }
  postLogin(){
    this.loading = true;
    this.userService.login(this.model.email, this.model.password)
      .subscribe(data => {
          let res = data;
          let membership = res.user_details[0].membership_status
          if(membership == "admin") {
            this.router.navigate(["admin"]);
          } else {
            this.router.navigate(["main"])
          }
          this.loading = false;
        },error => {
          this.loading = false;
        })
  }
  register(){
    this.showRegister = true;
  }
  resetEmail(){
    this.resetCheck = !this.resetCheck;
  }
  closeRegister = function() {
    this.showRegister = false;
  }
}
