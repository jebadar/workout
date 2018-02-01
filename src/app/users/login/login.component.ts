import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";

@Component({
  selector: 'login-component',
  templateUrl: './login.component.html',
  styleUrls: ['../../layout/public/public.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  
  model: any = {};
  returnUrl: string;
  
  loading = false;
  resetForm = false;
  errorReset = false;
  successReset = false;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    public toastr: ToastsManager
  ) { }

  ngOnInit() {
    this.userService.logout();
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/profile';
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
  }
  login() {
    if (this.loginForm.get('email').status == 'VALID') {
      this.model.email = this.loginForm.get('email').value;
    } else {
      this.toastr.warning("Email is required, Use valid email address",null, { tapToDismiss: true ,closeButton:true,showDuration: 300, hideDuration: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,showCloseButton: true});
    }
    if (this.loginForm.get('password').status == 'VALID') {
      this.model.password = this.loginForm.get('password').value;
    } else {
      this.toastr.warning("Enter valid password, Min 5 charaters",null, { tapToDismiss: true, closeButton:true,showDuration: 300, hideDuration: 1000,timeOut: 5000,extendedTimeOut: 1000,showCloseButton: true});
    }
    if (this.loginForm.status == 'VALID') {
    this.loading = true;
    this.userService.login(this.model.email, this.model.password)
      .subscribe(
        data => {
          let res = data;
          let membership = res.user_details[0].membership_status
          if(membership == "admin")
          {
            this.router.navigate(["admin"]);
          }
          else{
            this.router.navigate(["/"])
          }

          this.loading = false;
          
        },
        error => {
          this.loading = false;
        }
      )
    }
    
  }
  resetSubmit(){
    if (this.loginForm.get('email').status == 'VALID') {
      this.model.email = this.loginForm.get('email').value;
      this.reset(this.model);
    } else {
      this.toastr.warning("Email is required, Use valid email address",null, { tapToDismiss: true ,closeButton:true,showDuration: 300, hideDuration: 1000,
      timeOut: 5000,
      extendedTimeOut: 1000,showCloseButton: true});
    }
  }
  reset(model){
    this.loading = true;
    this.userService.forgetPassword(this.model.email)
    .subscribe(data => {
      this.loading = false;
      this.successReset = true;
    }, error =>{
      debugger
      this.loading = false;      
      this.toastr.warning("Email not found!",null, { showCloseButton: true});
    })
  }
  resetEmail() {
    this.resetForm = !this.resetForm;
  }

  setFlag(value:boolean){
    this.resetForm = value;
  }
}
