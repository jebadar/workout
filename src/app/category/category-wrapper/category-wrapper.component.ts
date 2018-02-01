import { Component, OnInit, OnDestroy } from '@angular/core';

import { FetchCategoryComponent } from '../../category/fetch-category/fetch-category.component'
import { CategoryService } from '../category.service'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { TitleService } from "../../shared/titleService/titleService";
import "rxjs/add/operator/takeWhile";

@Component({
  selector: 'category-wrapper-component',
  templateUrl: './category-wrapper.component.html',
  styleUrls: ['./category-wrapper.component.css']
})
export class CategoryWrapperComponent implements OnInit, OnDestroy {
  catObj;
  loading = true;
  alive;

  constructor(
    private categoryService: CategoryService,
    private titleService: TitleService
  ) { }
  
  ngOnDestroy(){
    this.alive=false;
  }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Manage Categories");},0);

    this.alive=true;
    this.loading = true;
    let catPromise = this.categoryService.fetchMajor();
    catPromise
    .takeWhile(() => this.alive)
    .subscribe(data=>{
      this.catObj = data;
      this.loading = false;
    });
  }

}
