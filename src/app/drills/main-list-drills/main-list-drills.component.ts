import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap';

import { DrillsService } from '../drills.service';
import { PreviewDrillComponent } from '../preview-drill/preview-drill.component';
import { LoaderRedComponent } from '../../shared/loader-red/loader-red.component';
import { Constants } from '../../constants'

@Component({
  selector: 'main-list-drills-component',
  templateUrl: './main-list-drills.component.html',
  styleUrls: ['../main-add-drill/main-add-drill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class MainListDrillsComponent implements OnInit {
  @Input() majorCategory;
  @Input() addDrill;
  @Input() pushDrill;
  @Input() parentDrillObj;

  constructor(
    private drillsService: DrillsService    
  ) { }
  assetsUrl = Constants.ASSET_URL;

  drills:any = [];
  selectedDrills = [];

  minor:any = {};
  subs;
  sub:any = {};
  counter;
  pageCounter = 0;
  limit = 2;
  page = 0;

  enablePreview = false;
  noDrillCheck = false;
  loading = false;

  ngOnInit() {
    this.closePreview = this.closePreview.bind(this);
  }
  ngOnDestroy(){
  }
  selectMinorCategory(e){   
    let counter = e.currentTarget.options.selectedIndex - 1;
    let minor = this.majorCategory.drillminors[counter];
    this.subs = minor.drill_subs;
  }
  selectSubCategory(e){
      let counter = e.currentTarget.options.selectedIndex - 1;
      this.sub = this.subs[counter]
      this.getDrills()
  }
  getDrills(){
    // if(this.sub.drills == undefined || this.sub.drills == null ){
      this.loading = true;
      this.noDrillCheck = false;
      this.drillsService.getDrills(this.limit, this.page, "", this.majorCategory.id, this.minor.id, this.sub.id)
      .subscribe(data => {
        this.drills = data.json().drill;
        let count = data.json().count;
        this.pageCounter = 2%count;
        this.updateStatus(this.drills)
        if(this.drills.length < 1){
          this.noDrillCheck = true;
        }
        this.loading = false;
        } , error => {
        this.loading = false;
      });
    // } else {
    //   this.drills = this.sub.drills
    // }
  }
  updateStatus(drills){
    drills.forEach(item => {
        this.parentDrillObj.forEach(element => {
          if(item.id == element.id){
            item.selected = true;
          }
        });
    });
  }
  insertDrill(drill){
    let tempDrill = [];
    tempDrill.push(drill)
    this.addDrill(tempDrill)
  }
  selectDrill(counter,id){
    this.pushDrill(this.drills[counter]);
    if(this.drills[counter].selected){
      this.selectedDrills.splice(this.drills[counter],1)
      this.drills[counter].selected = false;
    } else {
      this.drills[counter].selected = true;
      this.selectedDrills.push(this.drills[counter]);
    }
  }

/*Pagination Functions */
changePage(pageNum){
  if(pageNum >= 0){
    this.drills = [];
    this.page = pageNum;
    this.getDrills();
  }
}
  createRange(number){
    var items: number[] = [];
    for(var i = 1; i <= number; i++){
       items.push(i);
    }
    return items;
  }
/* End Area */
  openPreview(counter){
    this.drills[counter].enablePreview = true;
    this.counter = counter
  }
  closePreview = function(){
    this.drills[this.counter].enablePreview = false;
  }
}
