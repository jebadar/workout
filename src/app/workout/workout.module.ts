import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Ng2CompleterModule } from "ng2-completer";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from '../app-routing/app-routing.module';
import { WorkEditComponent } from './work-edit/work-edit.component'
import { SharedModule } from '../shared/shared.module'
import { WorkWrapperComponent } from './work-wrapper/work-wrapper.component';
import { WorkListComponent } from './work-list/work-list.component';
import { AddDrillComponent } from './add-drill/add-drill.component';
import { DrillsModule } from '../drills/drills.module';
import { UserWorkoutComponent } from './user-workout/user-workout.component';
import { SingleWorkoutComponent } from './single-workout/single-workout.component';
import { QuickWorkoutComponent } from './quick-workout/quick-workout.component';
import { EditMainComponent } from './edit-main/edit-main.component';
import { AddDiyWorkoutComponent } from './add-diy-workout/add-diy-workout.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    Ng2CompleterModule,
    FormsModule,
    AppRoutingModule, 
    ReactiveFormsModule,
    InfiniteScrollModule,
    DrillsModule 
  ],
  declarations: [
    WorkWrapperComponent, 
    WorkListComponent,
    WorkEditComponent,
    AddDrillComponent,
    UserWorkoutComponent,
    SingleWorkoutComponent,
    QuickWorkoutComponent,
    EditMainComponent,
    AddDiyWorkoutComponent
  ],
  exports:[
    WorkWrapperComponent,
    WorkEditComponent,
    WorkListComponent,
    UserWorkoutComponent,
    SingleWorkoutComponent,
    QuickWorkoutComponent,
    EditMainComponent,
    AddDiyWorkoutComponent
  ],
  entryComponents:[AddDrillComponent]
})
export class WorkoutModule { }
