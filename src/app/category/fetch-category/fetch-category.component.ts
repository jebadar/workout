import { Component, OnInit, Input } from '@angular/core';
import { CategoryService } from '../category.service'
import { SingleCategoryComponent } from '../single-category/single-category.component'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { AddCategoryComponent } from '../add-category/add-category.component'

@Component({
  selector: 'fetch-category-component',
  templateUrl: './fetch-category.component.html',
  styleUrls: ['./fetch-category.component.css']
})
export class FetchCategoryComponent implements OnInit {
  @Input() catObj;
  @Input() level;
  @Input() parentId;
  @Input() catAdded;
  
  dblClckCheck = false;
  addCategory = false;
  text;
  loader = false;
  minrInMjrChk = false;
  majorCardWidth = "0%";
  btnMarginTop;
  width = '';

  constructor(
    private categoryService: CategoryService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.categoryDeleted = this.categoryDeleted.bind(this);
  }

  categoryDeleted(data){
    let delIndex = -1;
    this.catObj.forEach((cat, index) => {
      if(cat.id===data.id){
        delIndex=index;
      }
    });

    if(delIndex>-1){
      this.catObj.splice(delIndex, 1);
    }
  }

  addByModal() {
    let data: any = {
      level: this.level,
      id: this.parentId
    }

    let disposable = this.dialogService.addDialog(AddCategoryComponent, {data})

    disposable.subscribe((response) => {
      if(response!=null && typeof response=="object"){
        this.catObj.push(response[0]);
      }
    });
  }
}