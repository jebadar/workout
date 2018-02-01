import { Component, OnInit, Input, OnChanges, OnDestroy, ViewEncapsulation } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'drill-categories-component',
  templateUrl: './drill-categories.component.html',
  styleUrls: ['./drill-categories.component.css']
})
export class DrillCategoriesComponent implements OnInit, OnDestroy {
  @Input() selectCategoryFunction;
  @Input() editData: any;
  @Input() edit;

  constructor(
    private categoryService: CategoryService
  ) { }
  alive;
  categories;
  majorCategories = [];
  minorCategories = [];
  subCategories = [];
  majorSelect = false;
  majorId = null;
  minorSelect = false;
  minorId = null;
  subId = null;
  noMinors = false;
  noSubs = false;
  loader = false;

  ngOnInit() {
    this.alive = true;
    this.fetchCategories();
  }

  ngOnDestroy(){
    this.alive=false;
  }

  fetchCategories() {
    
    this.loader = true;
    this.categoryService.fetchMajor()
      .takeWhile(() => this.alive)
      .subscribe(data => {
        this.categories = data;
        this.majorCategories = [];
        this.minorCategories = [];
        this.subCategories = [];
        for (var key in this.categories) {
          this.majorCategories.push(this.categories[key]);
          if (this.categories[key].drillminors.length > 0) {
            this.minorCategories[this.categories[key].id] = new Array();
            for (var j in this.categories[key].drillminors) {
              this.minorCategories[this.categories[key].id][j] = this.categories[key].drillminors[j];
              if (this.categories[key].drillminors[j].drill_subs.length > 0) {
                this.subCategories[this.categories[key].drillminors[j].id] = new Array();
                for (var k in this.categories[key].drillminors[j].drill_subs) {
                  this.subCategories[this.categories[key].drillminors[j].id][k] = this.categories[key].drillminors[j].drill_subs[k];
                }

              }
            }
          }
        }
        this.loader = false;
        if (this.edit == true) {
          this.updateForm();
        }
      }, error => { });
  }

  selectMajorCategory(id) {
    this.minorId = null;
    this.subId = null;
    
    id = Number(id);
    if (!Number.isNaN(id)) {
      this.selectCategoryFunction(id, "major");
    } else {
      this.selectCategoryFunction(null, "major");
    }
  }

  selectMinorCategory(id) {
    this.subId = null;
    
    id = Number(id);
    if (!Number.isNaN(id)) {
      this.selectCategoryFunction(id, "minor");
    } else {
      this.selectCategoryFunction(null, "minor");
    }
  }
  selectSubCategory(id) {
    id = Number(id);
    if (!Number.isNaN(id)) {
      this.selectCategoryFunction(id, "sub");
    } else {
      this.selectCategoryFunction(null, "sub")
    }
  }

  updateForm() {

    this.majorId = this.editData.majorId;
    this.minorId = this.editData.minorId;
    this.subId = this.editData.subId;

  }

}
