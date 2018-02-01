import { Component, OnInit, Input } from '@angular/core';
// import 'rxjs/Rx';
import { Observable } from "rxjs/Observable";
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { CategoryService } from '../category.service'
import { FetchCategoryComponent } from '../fetch-category/fetch-category.component'
import { LoaderComponent } from '../../shared/loader/loader.component'
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

@Component({
  selector: 'single-category-component',
  templateUrl: './single-category.component.html',
  styleUrls: ['./single-category.component.css']
})
export class SingleCategoryComponent implements OnInit {
  @Input() catObj;
  @Input() level;
  @Input() categoryDeleted;
  margin_left;
  nextLevel;
  dbleClckCheck = false;
  touchtime = 0;
  _marginLeftIcon;
  showChildren=false;
  loading = false;
  children=[];
  oldName=null;
  
  constructor(
    private categoryService:CategoryService,
    private toastr:ToastsManager
  ) { }

  ngOnInit() {
    this.catObj.showChildren = this.catObj.showChildren || false;
    if(this.level=="Major"){
      this.nextLevel = "Minor";
      this.children = this.catObj.drillminors;
    } else if(this.level=="Minor"){
      this.nextLevel = "Sub";
      this.children = this.catObj.drill_subs;
    } else{
      this.nextLevel = null;
    }
  }
  onDblClicked(){ 
    this.oldName=this.catObj.name;
    this.dbleClckCheck = true;
  }
  keyDownFunction(event) {
    if (event.keyCode == 13) {
      this.putCategory();
     }
     else if(event.keyCode == 27)
     {
      this.dbleClckCheck = false;
     }
  }

  cancel() {
    this.dbleClckCheck = false;
  }

  showClildren()
  {
    if(this.nextLevel==null){
      return;
    } else{
      this.catObj.showChildren = !this.catObj.showChildren
    }
  }


  delete()
  {
    
    if(confirm("Are you sure?") == true)
    {
      this.loading = true;
      let delPromise;

      if(this.level=="Major"){
        if(this.catObj.drillminors.length>0){
          this.toastr.error('Please delete its minor categories first')
          this.loading = false
          return;
        }
      } else if(this.level=="Minor"){
        if(this.catObj.drill_subs.length>0){
          this.toastr.error('Please delete its sub categories first')
          this.loading = false
          return;
        }
      }


      if(this.level=="Major"){
          delPromise = this.categoryService.deleteMajor(this.catObj.id);
      } else if(this.level=="Minor"){
          delPromise = this.categoryService.deleteMinor(this.catObj.id);
      } else {
        delPromise = this.categoryService.deleteSub(this.catObj.id);
      }

      delPromise.subscribe(data=>{
        let cat = data.json();
        this.categoryDeleted(this.catObj);
        
      }, err=>{
        this.loading = false
      })

    }
  }

  putCategory() {
    let cat = {
      name: this.catObj.name,
    }

    let updatePromise;
    this.loading = true;
    this.dbleClckCheck = false;
    if(this.level=="Major"){
      updatePromise = this.categoryService.putMajor(this.catObj.id,cat)
    } else if(this.level=="Minor"){
      updatePromise = this.categoryService.putMinor(this.catObj.id,cat)
    } else if(this.level=="Sub"){
      updatePromise = this.categoryService.putSub(this.catObj.id,cat)
    }

    updatePromise.subscribe(data => {
      let res  = data.json()
      this.catObj.name = res[0].name;
      this.toastr.success("Category name updated.")
      this.loading = false
    }
    ,error => {
      if(this.oldName){
        this.catObj.name = this.oldName;
        this.loading = false
      }
    })
  }

}
