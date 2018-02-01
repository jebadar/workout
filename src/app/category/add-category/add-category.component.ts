import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../category.service';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { ToastsManager } from 'ng2-toastr/ng2-toastr';

export interface ConfirmModel {
  data:any;
}

@Component({
  selector: 'add-category-component',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})

export class AddCategoryComponent extends DialogComponent<ConfirmModel, boolean> implements ConfirmModel {
  data: any;
  addCategory:FormGroup
  loading = false;

  constructor(
    dialogService: DialogService,
    private categoryService:CategoryService,
    private toastr:ToastsManager
  ) {
    super(dialogService);
    this.addCategory = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
      ])
    });
  }
  
  confirm() {
    // we set dialog result as true on click on confirm button, 
    // then we can get dialog result from caller code 
    if (this.addCategory.get('title').status == 'VALID') {
      this.add()
    } 
    else{
      this.toastr.warning("Invalid value!")
    }
  }
  navigate()
  {
    //this.result = this.response.id
    this.close();
  }
  add()
  {
    this.loading = true;
    let categoryObj:any = {}
    let addCatPromise;
    categoryObj.name = this.addCategory.get('title').value
    
    if(this.data.level == 'Major') {
      addCatPromise = this.categoryService.addMajor(categoryObj)
    } else if(this.data.level == 'Minor') {
      categoryObj.major_id = this.data.id;
      addCatPromise = this.categoryService.addMinor(categoryObj)
    } else if (this.data.level == 'Sub'){
      categoryObj.minor_id = this.data.id;
      addCatPromise = this.categoryService.addSub(categoryObj)
    }

    addCatPromise.subscribe(data => {
      this.result  = data.json();
      this.loading = false;
      this.close()
    }, err=>{
      this.loading = false;
    });

  }
}