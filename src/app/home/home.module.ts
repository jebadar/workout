import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexComponent } from './index/index.component';
import { UsersModule } from '../users/users.module';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { WorkoutModule } from '../workout/workout.module';

@NgModule({
  imports: [
    CommonModule,
    UsersModule,
    AppRoutingModule,
    WorkoutModule
  ],
  declarations: [IndexComponent],
  exports: [IndexComponent]
})
export class HomeModule { }
