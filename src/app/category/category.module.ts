import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FetchCategoryComponent } from './fetch-category/fetch-category.component';
import { SingleCategoryComponent } from './single-category/single-category.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { CategoryWrapperComponent } from './category-wrapper/category-wrapper.component';
import { AddCategoryComponent } from './add-category/add-category.component'
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    FetchCategoryComponent,
    SingleCategoryComponent,
    CategoryWrapperComponent,
    AddCategoryComponent
  ],
  exports:[
    FetchCategoryComponent,
    SingleCategoryComponent,
    CategoryWrapperComponent
  ],
  entryComponents:[AddCategoryComponent]
})
export class CategoryModule { }
