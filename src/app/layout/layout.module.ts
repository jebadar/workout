import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { CategoryModule } from '../category/category.module'
import { UsersModule } from '../users/users.module';
import { PublicComponent } from './public/public.component';
import { WorkoutModule } from '../workout/workout.module'
import { SettingsModule } from '../settings/settings.module'
import { DrillsModule } from '../drills/drills.module';
import { WTemplateModule } from '../w-template/w-template.module';
import { TitleService } from '../shared/titleService/titleService';
import { MainComponent } from './main/main.component';
import { IndexMainComponent } from './index-main/index-main.component'
import { HomeModule } from '../home/home.module'
import { MainModule } from '../main/main.module'
import { SharedModule } from '../shared/shared.module'
import { CollapseModule } from 'ngx-bootstrap'

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    UsersModule,
    CategoryModule,
    WorkoutModule,
    SettingsModule,
    DrillsModule,
    WTemplateModule,
    HomeModule,
    MainModule,
    SharedModule,
    CollapseModule
  ],
  declarations: [
    AdminComponent, 
    PublicComponent,
    MainComponent,
    IndexMainComponent
  ],
  providers: [
    TitleService
  ]
})
export class LayoutModule { }
