import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddTemplateComponent } from './add-template/add-template.component';
import { ListTemplatesComponent } from './list-templates/list-templates.component';
import { TemplateWrapperComponent } from './template-wrapper/template-wrapper.component';
import { SearchTemplatesComponent } from './search-templates/search-templates.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TemplateCategoriesComponent } from './template-categories/template-categories.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,    
    InfiniteScrollModule,
    SharedModule
  ],
  declarations: [AddTemplateComponent, ListTemplatesComponent, TemplateWrapperComponent, SearchTemplatesComponent, TemplateCategoriesComponent],
  exports: [
    TemplateWrapperComponent
  ]
})
export class WTemplateModule { }
