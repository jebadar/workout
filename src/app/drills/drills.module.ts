import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { BsDropdownModule } from 'ngx-bootstrap';

import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SearchDrillsComponent } from './search-drills/search-drills.component';
import { ListDrillsComponent } from './list-drills/list-drills.component';
import { AddDrillComponent } from './add-drill/add-drill.component';
import { DrillWrapperComponent } from './drill-wrapper/drill-wrapper.component';
import { DrillCategoriesComponent } from './drill-categories/drill-categories.component';
import { PreviewDrillComponent } from './preview-drill/preview-drill.component';
import { MainAddDrillComponent } from './main-add-drill/main-add-drill.component';
import { MainListDrillsComponent } from './main-list-drills/main-list-drills.component'

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    InfiniteScrollModule,
    BsDropdownModule.forRoot()    
  ],
  declarations: [
    DrillWrapperComponent, 
    AddDrillComponent, 
    ListDrillsComponent, 
    SearchDrillsComponent, 
    DrillCategoriesComponent,
    PreviewDrillComponent,
    MainAddDrillComponent,
    MainListDrillsComponent
  ],
  exports: [
    DrillWrapperComponent, 
    ListDrillsComponent,
    PreviewDrillComponent,
    MainAddDrillComponent
  ]
})
export class DrillsModule { }
