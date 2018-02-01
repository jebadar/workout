import { Component, OnInit } from '@angular/core';
import { WorkListComponent } from '../work-list/work-list.component'
import { TitleService } from "../../shared/titleService/titleService";

@Component({
  selector: 'app-work-wrapper',
  templateUrl: './work-wrapper.component.html',
  styleUrls: ['./work-wrapper.component.css']
})
export class WorkWrapperComponent implements OnInit {

  constructor(
    private titleService: TitleService
  ) { 
    
  }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Manage Workouts");},0);
  }

}
