import { Component, OnInit } from '@angular/core';
import { AddDrillComponent } from '../add-drill/add-drill.component';
import { ListDrillsComponent } from '../list-drills/list-drills.component';
import { SearchDrillsComponent } from '../search-drills/search-drills.component';

import { TitleService } from "../../shared/titleService/titleService";

@Component({
  selector: 'drill-wrapper-component',
  templateUrl: './drill-wrapper.component.html',
  styleUrls: ['./drill-wrapper.component.css']
})
export class DrillWrapperComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Manage Drills");},0);
  }

}
