import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';

import { CategoryService } from '../../category/category.service';
import { MainListDrillsComponent } from '../main-list-drills/main-list-drills.component'
import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';

@Component({
  selector: 'main-add-drill-component',
  templateUrl: './main-add-drill.component.html',
  styleUrls: ['./main-add-drill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainAddDrillComponent implements OnInit {
@Input() close;
@Input() majorCategory;
@Input() addDrill;

  constructor(
    private categoryService:CategoryService
  ) { }

  drillArr = [];

  categories = null;
  durationOfSelectedDrills = 0;

  loading = false;

  ngOnInit() {
      this.fetchCategory()
      this.pushDrill = this.pushDrill.bind(this);
  }
  fetchCategory(){
    this.loading = true;
    this.categoryService.fetchMajor()
    .subscribe(data => {
      if(this.categories == null){
        this.categories = data
      }
      
      this.loading = false;
    }, error => {
      this.loading = false;
    })
  }
  addDrillToWorkout(){
    this.addDrill(this.drillArr);
  }
  pushDrill = function(drill){
    if(drill.selected){
      this.drillArr.splice(drill,1)
    } else {
      this.drillArr.push(drill);      
    }
    this.updateDuration(this.drillArr);
  }
  updateDuration(drills){
    this.durationOfSelectedDrills = 0;
    drills.forEach(element => {
      this.durationOfSelectedDrills = Number(this.durationOfSelectedDrills)  + Number(element.duration);
    });
  }
  closeme(e){
    this.close();
  }
  openDrop(counter){
    if(this.categories[counter].selected){
    this.categories[counter].selected = false;    
    } else {
      this.categories[counter].selected = true;      
    }
  }
  ignoreClick(e){
    e.stopPropagation();
  }
}
