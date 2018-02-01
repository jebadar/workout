import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { LoaderComponent } from '../../shared/loader/loader.component';

@Component({
  selector: 'template-categories-component',
  templateUrl: './template-categories.component.html',
  styleUrls: ['./template-categories.component.css']
})
export class TemplateCategoriesComponent implements OnInit {
  @Input() counter;
  @Input() addCategory;
  @Input() catObj;

  constructor(
    private categoryService: CategoryService
  ) { }
  
  loader = false;
  
  majorCategories = [];
  minorCategories = [];

  majorSelected = 0;
  minorSelected = 0;
  
  ngOnInit() {
    this.fetchMajorCategory();
    if(this.catObj){
      console.log(this.catObj);
      this.minorSelected=this.catObj.id;
      this.majorSelected=this.catObj.drill_majors.id
    }
  }
  fetchMajorCategory(){
    this.loader = true;
    this.categoryService.fetchMajor()
      .subscribe(data => {
        let categories = data;
        this.majorCategories = [];
        this.minorCategories = [];
        for (var key in categories) {
          this.majorCategories.push(categories[key]);
          if (categories[key].drillminors.length > 0) {
            this.minorCategories[categories[key].id] = new Array();
            for (var j in categories[key].drillminors) {
              this.minorCategories[categories[key].id][j] = categories[key].drillminors[j];
            }
          }
        }
        this.loader = false;
      });

  }

  selectMinorCategory() {
    
    this.addCategory(this.minorSelected, this.counter);
  }
}
