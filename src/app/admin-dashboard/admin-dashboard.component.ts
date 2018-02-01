import { Component, OnInit } from '@angular/core';
import { TitleService } from "../shared/titleService/titleService";

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit() {
    
    setTimeout(()=>{this.titleService.setTitle("Dashboard");},0);
    
  }

}
