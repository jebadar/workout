import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { ModalModule } from 'ngx-bootstrap';
import { ToastModule} from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BootstrapModalModule } from 'ng2-bootstrap-modal';

import { UserService } from './users/user.service'
import { AppRoutingModule } from './app-routing/app-routing.module';
import { LayoutModule } from './layout/layout.module';
import { AppGuard } from './app-routing/app.guard'
import { AppComponent } from './app.component';
import { HttpService } from './app-services/http.service'
import { LocalStoreService } from './app-services/local-store.service'
import { CategoryService } from './category/category.service';
import { LoaderComponent } from './shared/loader/loader.component'
import { WorkoutService } from './workout/workout.service'
import { SettingsService } from './settings/settings.service'
import { DrillsService } from '../app/drills/drills.service';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { WTemplateService } from '../app/w-template/w-template.service';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';


@NgModule({
  declarations: [
   AppComponent,
   AdminDashboardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    LayoutModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    BootstrapModalModule.forRoot({container:document.body}),
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot(),
    ModalModule.forRoot()
  ],
  providers: [
    AppGuard,
    UserService,
    HttpService,
    LocalStoreService,
    CategoryService,
    WorkoutService,
    SettingsService,
    DrillsService,
    WTemplateService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
