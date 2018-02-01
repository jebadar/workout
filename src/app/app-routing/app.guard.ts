import { Injectable } from '@angular/core';
import { Router,CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {UserService} from '../users/user.service'

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private router: Router,
    private userService:UserService,
    public activatedRoute:ActivatedRoute,
    private toastr: ToastsManager
  )
  {}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot){
      let roles = next.data["roles"];
      let user:any = {};
      if (this.userService.isAuthenticated()){
          //logged in so return true
          user = this.userService.getLoggedInUser();
          if(roles[0]=="admin"){
            if(user.membership_status == roles[0]){
              return true;
            } else {
              this.router.navigate([''])
            }
          } else {
            return true;
          }
      } else {
        // not logged in so redirect to login page with the return url
        this.toastr.error("Please login first");
        this.router.navigate(['/main'], { queryParams: { returnUrl: state.url }});
        return false;
      }
  }
}
