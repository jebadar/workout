import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from '../layout/admin/admin.component';
import { PublicComponent } from '../layout/public/public.component';
import { CategoryWrapperComponent } from '../category/category-wrapper/category-wrapper.component';
import { DrillWrapperComponent } from '../drills/drill-wrapper/drill-wrapper.component';
import { AddDrillComponent } from '../drills/add-drill/add-drill.component';
import { ListDrillsComponent } from '../drills/list-drills/list-drills.component';
import { AppGuard } from './app.guard'
import { UserWrapperComponent } from '../users/user-wrapper/user-wrapper.component'
import { EditUserComponent } from '../users/edit-user/edit-user.component'
import { FetchUsersComponent } from '../users/fetch-users/fetch-users.component'
import { WorkWrapperComponent  } from '../workout/work-wrapper/work-wrapper.component'
import { WorkListComponent  } from '../workout/work-list/work-list.component'
import { WorkEditComponent  } from '../workout/work-edit/work-edit.component'
import { SettingsWrapperComponent  } from '../settings/settings-wrapper/settings-wrapper.component'
import { SettingsListComponent  } from '../settings/settings-list/settings-list.component'
import { TemplateWrapperComponent } from '../w-template/template-wrapper/template-wrapper.component';
import { AddTemplateComponent } from '../w-template/add-template/add-template.component';
import { ListTemplatesComponent } from '../w-template/list-templates/list-templates.component';
import { IndexMainComponent } from '../layout/index-main/index-main.component';
import { MainComponent } from '../layout/main/main.component';
import { IndexComponent } from '../home/index/index.component';
import { MainWrapperComponent } from '../main//main-wrapper/main-wrapper.component';
import { ProfileMainComponent } from '../users/profile-main/profile-main.component';
import { SingleWorkoutComponent } from '../workout/single-workout/single-workout.component';
import { AdminDashboardComponent } from "../admin-dashboard/admin-dashboard.component";
import { VerifyComponent } from '../users/verify/verify.component';
import { ResetPasswordComponent } from '../users/reset-password/reset-password.component'
import { EditMainComponent } from '../workout/edit-main/edit-main.component';
import { LoginRegisterComponent } from '../users/login-register/login-register.component'


const routes: Routes = [
    { 
        path: 'login', 
        component: PublicComponent, 
    },
    {
        path: 'admin',
        canActivate:[AppGuard],
        data: {roles: ['admin']},
        component: AdminComponent,
        children:[
            {
                path:"",
                component: AdminDashboardComponent
            },
            {
                path:'user',
                component:UserWrapperComponent,
                children:[
                    {path:'',component:FetchUsersComponent},
                    {path:'add',component:EditUserComponent},
                    {path:'edit/:id',component:EditUserComponent}
                ]
            },
            {
                path:'workout',
                component:WorkWrapperComponent,
                children:[
                    {path:'',component:WorkListComponent},
                    {path:'edit/:id',component:WorkEditComponent}
                ] 
            },
            {
                path:'settings',
                component:SettingsWrapperComponent,
                children:[
                    {path:'',component:SettingsListComponent},
                 ] 
            },
            { 
                path: 'category', 
                component: CategoryWrapperComponent 
            },
            { 
                path: 'drills', 
                component: DrillWrapperComponent,
                children: [
                    { path: '', component: ListDrillsComponent },
                    { path: 'add', component: AddDrillComponent },
                    { path: 'edit/:id', component: AddDrillComponent },
                ]
            },   
            { 
                path: 'templates', 
                component: TemplateWrapperComponent,
                children: [
                    { path: '', component: ListTemplatesComponent },
                    { path: 'add', component: AddTemplateComponent },
                    { path: 'edit/:id', component: AddTemplateComponent },
                ]
            },  
        ]
    },
    
    // {
    //     path: '',
    //     component: IndexMainComponent,
    //     children:[
    //         { 
    //             path: '', 
    //             component: IndexComponent, 
    //             children: [
    //             { path: 'verify/:verifyTokken', component: VerifyComponent },
    //             { path:'reset/:verifyTokken',component: ResetPasswordComponent}
    //             ] 
    //         },
    //     ]
    // },
    {
        path: '',
        component: MainComponent,
        children:[
            { 
                path: '', 
                component: MainWrapperComponent,
                canActivate:[AppGuard],
                data: {roles: ['user']}, 
                children:[
                    {path: '', component: ProfileMainComponent},
                    {path:'workout/:id',component:SingleWorkoutComponent},
                    {path: 'workoutEdit/:id',component:EditMainComponent}
                ]
            },
            { 
                path: 'main', 
                component: PublicComponent,
                children: [
                    { path: 'verify/:verifyTokken', component: VerifyComponent },
                    { path:'reset/:verifyTokken',component: ResetPasswordComponent}
                ] 
            }
        ]
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ],
    declarations: []
})
export class AppRoutingModule { }