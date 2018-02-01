import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../user.service';
import { LoaderComponent } from '../../../app/shared/loader/loader.component'
import { RegisterComponent } from '../register/register.component';
import { Constants } from '../../constants';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['../register/register.component.css']
})
export class VerifyComponent implements OnInit {

  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private router: Router
  ) { }
  assetsUrl = Constants.ASSET_URL;

  response = false;
  returnUrl = "";
  loading = false;
  data: string;
  verifyResponse = false
  ngOnInit() {
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'] || 'register';
    let accessToken: string;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.verifyTokken) {
        accessToken = params.verifyTokken;
      }
    });
    if (accessToken != ":") {
      this.verify(accessToken);
    } else {
      this.router.navigate(['/']);
    }
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
    this.router.navigate([''])
  }
}
