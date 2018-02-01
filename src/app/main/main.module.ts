import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainWrapperComponent } from './main-wrapper/main-wrapper.component';
import { UsersModule } from '../users/users.module'
import { WorkoutModule } from  '../workout/workout.module'
import { AppRoutingModule } from '../app-routing/app-routing.module';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    WorkoutModule,
    AppRoutingModule 
  ],
  declarations: [
    MainWrapperComponent
  ]
})
export class MainModule { }
