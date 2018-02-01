import { Component, OnInit, Input } from '@angular/core';
import { DrillsService } from '../drills.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { Constants } from '../../constants';
import { CategoryService } from '../../category/category.service';
import { ConfirmComponent } from '../../shared/confirm/confirm.component';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { OnDestroy } from '@angular/core';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'list-drills-component',
  templateUrl: './list-drills.component.html',
  styleUrls: ['./list-drills.component.css']
})
export class ListDrillsComponent implements OnInit, OnDestroy {
 @Input() selectDrills;
 
  constructor(
    private drillsService: DrillsService,
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) { }

  drills;
  loader = false;
  url;
  name = null;
  categories;
  majorCategories = [];
  minorCategories = [];
  subCategories = [];
  majorSelect = false;
  majorId = 0;
  minorSelect = false;
  minorId = 0;
  subSelect = false;
  subId = 0;
  page = 0;
  limit = 10;
  load_more = false;
  temp_drills;
  alive;

  searchTitle = "";
  searchMajor = null;
  searchMinor = null;
  searchSub = null;
  scrollClass="search-results";

  ngOnInit() {
    this.alive=true;
    
    if(this.selectDrills != undefined){
      this.scrollClass ="modal-body"
    }

    this.url = Constants.STORAGE_URL;
    
    this.getcategories();
    this.searchDrill();
  }

  ngOnDestroy(){
    this.alive=false;
  }
  getcategories()
  {

    this.categoryService.fetchMajor()
    .takeWhile(() => this.alive)
    .subscribe(data => {
      this.categories = data;
      
      let majorCategories = [];
      let minorCategories = [];
      let subCategories = [];
      for (var key in this.categories) {
        majorCategories.push(this.categories[key]);
        if (this.categories[key].drillminors.length > 0) {
          minorCategories[this.categories[key].id] = new Array();
          for (var j in this.categories[key].drillminors) {
            minorCategories[this.categories[key].id][j] = this.categories[key].drillminors[j];
            if (this.categories[key].drillminors[j].drill_subs.length > 0) {
              subCategories[this.categories[key].drillminors[j].id] = this.categories[key].drillminors[j].drill_subs;
              // for (var k in this.categories[key].drillminors[j].drill_subs) {
              //   subCategories[this.categories[key].drillminors[j].id][k] = this.categories[key].drillminors[j].drill_subs[k];
              // }
            }
          }
        }
      }
      this.majorCategories = majorCategories;
      this.minorCategories = minorCategories;
      this.subCategories = subCategories;
      // this.searchMajor = null;
      // this.searchMinor = null;
      // this.searchSub = null;
    }, error => { });
  }

  getDrills(){
    this.loader = true;
    this.drillsService.getDrills(this.limit, this.page, this.searchTitle, this.searchMajor, this.searchMinor, this.searchSub)
    .takeWhile(() => this.alive)
    .subscribe(data => {
      this.temp_drills = data.json();
      this.temp_drills = this.temp_drills.drill;
      if (this.temp_drills.length > 0) {
        for (var k in this.temp_drills) {
          this.drills.push(this.temp_drills[k]);
        }
      } else {
        this.load_more = true;
      }
      this.loader = false;
    });
  }

  fetchDrills() {
    this.load_more = false;
    this.getDrills();
  }

  searchDrill() {
    this.load_more = false;
    this.page=0;
    this.drills = [];
    this.getDrills();
  }
  addDrillToWorkout(drill)
  {
    if(drill.selected != undefined){
     drill.selected = false;
    }else{
      drill.selected = true;
    }
    this.selectDrills(drill);
  }
  onScroll() {
      if (!this.load_more) {
        this.page++;
        this.fetchDrills();
      }
  }
  deleteDrill(id,counter){

    let noPurpose = "";
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      //We get dialog result
        if (response) {
          this.drills[counter].deletedCheck = true;
          this.drillsService.deleteDrill(id)
          .takeWhile(() => this.alive)
          .subscribe(data => {
            let res = data.json();
            this.drills.splice(counter,1);
          },error => { 
            delete this.drills[counter].deletedCheck
          })
        }
      
    })
  }
}
