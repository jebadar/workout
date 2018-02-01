import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from '../user.service'
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { LoaderComponent } from '../../shared/loader/loader.component'

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private toastr: ToastsManager,
    private router: Router
  ) { }
  user_id;
  user: any = {}
  userForm: FormGroup
  editCheck = false;
  text;
  confirmPasword;
  formValid = false;
  loading = false;
  disableEmail = false;
  confirmRequiredCheck = false;
  widthCard = "0%";
  myId=0;

  ngOnInit() {
    this.myId = this.userService.getLoggedInUser().id;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.user_id = params.id;
        if (this.user_id == undefined || this.user_id == 'null') {
          this.text = "ADD NEW USER"
        }else {
          this.fetchInfoUser(params.id)
        }
      } else{
        this.text = "ADD NEW USER"
      }
    })
    this.userForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$")
      ]),
      name: new FormControl(null, [
        Validators.required
      ]),
      cell_no: new FormControl(null),
      landline: new FormControl(null),
      password: new FormControl(null,[
        Validators.pattern("^.{8,}$")
      ]),
      confirmPassword: new FormControl(null, [
        Validators.pattern("^.{8,}$")
      ])
    });
    
   }
  fetchInfoUser(id) {
    this.loading = true;
    this.userService.fetchUserById(id)
      .subscribe(data => {
        this.user = data.json().user
        this.editCheck = true;
        this.text = "EDIT USER"
        this.fillUserData();

        this.loading = false;
      })
  }

  fillUserData(){
    this.userForm.get("email").setValue(this.user.email);
    this.userForm.get("name").setValue(this.user.name);
    this.userForm.get("cell_no").setValue(this.user.cell_number);
    this.userForm.get("landline").setValue(this.user.landline);
  }
  submit() {
    if (!this.editCheck) {
      if (this.userForm.get('email').status == 'VALID') {
        this.user.email = this.userForm.get('email').value;
      } else {
        this.toastr.warning("Email is required, Use valid email address");
      }
    }
    
    if (this.userForm.get('name').status == 'VALID') {
      this.user.name = this.userForm.get('name').value;
    } else {
      this.toastr.warning("Name is required, Use valid Name");
    }
    
    if (this.userForm.get('cell_no').value != null) {
      this.user.cell_number = this.userForm.get('cell_no').value;
    }
    
    if (this.userForm.get('landline').value != null) {
      this.user.landline = this.userForm.get('landline').value;
    }
    
    if (this.userForm.get('password').value != null) {
      if (this.userForm.get('password').status == 'VALID') {
        this.user.password = this.userForm.get('password').value;
        this.confirmRequiredCheck = true;
      }else
        this.toastr.warning("Password must be atleast 8 characters long")
    }else {
      if (!this.editCheck) {
        this.toastr.warning("Password must be atleast 8 characters long")
      }
    }
    
    if (this.confirmRequiredCheck){
    if(this.userForm.get('confirmPassword').value != null) {
      if (this.userForm.get('confirmPassword').status == 'VALID') {
        this.confirmPasword = this.userForm.get('confirmPassword').value;
      } else
        this.toastr.warning("Password must be atleast 8 characters long")
    }else {
        this.toastr.warning("Confirm Password is required");
    }
  }
    if (this.userForm.status == 'VALID') {
      if (this.user.password != null && this.confirmPasword != null) {
        if (this.checkPassword(this.user.password, this.confirmPasword)) {
          this.formValid = true;
        }
      }
      else if (!this.confirmRequiredCheck && this.editCheck) {
        delete this.user.password;
        this.formValid = true;
      }
    }
    if (this.formValid) {
      if (this.editCheck) {
        this.postOldUser()
      }
      else {
        this.postNewUser()
      }
    }
  }
  postNewUser() {
    this.loading = true;
    this.userService.addUser(this.user)
      .subscribe(data => {
        let res = data.json()
        this.loading = false;
        this.toastr.success('Addedd Sucessfully')
        this.router.navigate(['/admin/user/edit/'+res.id])
      },
      error => {
        this.loading = false;
      })
  }
  postOldUser() {
    this.loading = true;
    this.userService.putUser(this.user, this.user.id)
      .subscribe(data => {
        let res = data.json()
        this.loading = false;
        this.toastr.success('Updated Sucessfully')
      })
  }
  checkPassword(password, confirmPass) {
    if (this.user.password == this.confirmPasword) {
      return true;
    } else {
      this.toastr.warning("Password not matched");
      return false;
    }
  }
  unblockUser(id) {
    let user: any = {}
    user.status = "1";
    this.loading = true;
    this.userService.putUser(user, id)
      .subscribe(data => {
        this.user = data.json();
        this.loading = false;
      })
  }
  makeAdmin(id) {
    let user: any = {}
    user.membership_status = 'admin'
    this.userService.putUser(user, id)
      .subscribe(data => {
        this.user = data.json()
      })
  }
  blockUser(id) {
    this.loading = true;
    this.userService.blockUser(id)
      .subscribe(data => {
        this.loading = false;
        this.toastr.success('Blocked Sucessfully')
        this.user = data.json()
      })
  }
  removeAdmin(id)
  {
    let user: any = {}
    user.membership_status = 'unverified'
    this.userService.putUser(user, id)
      .subscribe(data => {
        this.user = data.json()
      })
  }
  back()
  {
    this.router.navigate(['admin/user']);
  }
}
