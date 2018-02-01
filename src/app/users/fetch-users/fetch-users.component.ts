import { Component, OnInit, OnChanges } from '@angular/core';
import { UserService } from '../user.service'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-fetch-users',
  templateUrl: './fetch-users.component.html',
  styleUrls: ['./fetch-users.component.css']
})
export class FetchUsersComponent implements OnInit {

  constructor(
    private userService:UserService,
    private router: Router
  ) { }
 users: Array<string> = [];
 loading = false;
 limit = 20;
 page = 0
 loadMoreCheck = false;
 name = "";
 email = "";
 member_status = "";
 widthCard = "0%";
 
  ngOnInit() {
    this.fetchUsers()
  }
  fetchUsers()
  {
    this.loading = true;
    this.userService.fetchUsers(this.limit,this.page,this.name,this.email,this.member_status)
    .subscribe(data => {
      if(this.users.length < 1)
      {
        this.users = data.json().users
      }
      else
      {
        let tempUsers = data.json().users
        if(tempUsers.length  < 1)
        {
          this.loadMoreCheck = true;
        }
        else 
        {
          this.pushUser(tempUsers)
        }
      }
      this.loading = false;  
    })
  }
  searchUser()
  {
    this.users = [];
    this.limit = 7;
    this.page = 0;
    this.loadMoreCheck = false;
    this.fetchUsers()
  }
  pushUser(users)
  {
    users.forEach(item => {
      this.users.push(item);
    });
  }

  edit(id)
  {
    this.router.navigate(['/admin/user/edit/'+id])
  }
  addUser()
  {
    this.router.navigate(['/admin/user/add'])
  }
  ngOnChanges(changes) {
  }
  onScroll()
  {
    if(!this.loadMoreCheck)
    {
      this.page++;
      this.fetchUsers()
    }
    
  }
}
