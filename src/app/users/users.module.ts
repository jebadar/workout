import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutComponent } from './logout/logout.component';
import { UserWrapperComponent } from './user-wrapper/user-wrapper.component';
import { FetchUsersComponent } from './fetch-users/fetch-users.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { UserAdminWrapperComponent } from './user-admin-wrapper/user-admin-wrapper.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SharedModule } from '../shared/shared.module'
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { InlineLoginComponent } from './inline-login/inline-login.component';
import { InfoBoxComponent } from './info-box/info-box.component';
import { RegisterComponent } from './register/register.component';
import { ProfileMainComponent } from './profile-main/profile-main.component';
import { WorkoutModule } from  '../workout/workout.module';
import { VerifyComponent } from './verify/verify.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { LoginRegisterComponent } from './login-register/login-register.component'
import { NewWorkoutWrapperComponent } from './new-workout-wrapper/new-workout-wrapper.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    SharedModule,
    InfiniteScrollModule,
    WorkoutModule
  ],
  declarations: [
    LoginComponent,
    LogoutComponent, 
    UserWrapperComponent, 
    FetchUsersComponent, 
    EditUserComponent, 
    InlineLoginComponent, 
    InfoBoxComponent, 
    RegisterComponent, 
    UserAdminWrapperComponent, 
    ProfileMainComponent, 
    VerifyComponent, 
    ResetPasswordComponent, 
    LoginRegisterComponent,
    NewWorkoutWrapperComponent
  ],
  exports:[
    LoginComponent,
    LogoutComponent, 
    InlineLoginComponent, 
    InfoBoxComponent, 
    LoginRegisterComponent
  ]
})
export class UsersModule { }
