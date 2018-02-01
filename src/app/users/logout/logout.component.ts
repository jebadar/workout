import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import {Router,ActivatedRoute} from '@angular/router';

@Component({
  selector: 'logout-component',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {
@Input() mainPage;
  constructor(
    private route:ActivatedRoute,
    private router:Router,
    private userService:UserService
  ) { }
  returnUrl;
  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/main';
  }

  logout()
  {
    this.userService.logout();
    this.router.navigate(['/main']);
  }
}
