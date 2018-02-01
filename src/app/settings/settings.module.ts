import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsWrapperComponent } from './settings-wrapper/settings-wrapper.component';
import { SettingsListComponent } from './settings-list/settings-list.component';
import { AppRoutingModule } from '../app-routing/app-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TemplateComponent } from './template/template.component';
import { DiyComponent } from './diy/diy.component';
import { PaymentComponent } from './payment/payment.component'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditDurationComponent } from './edit-duration/edit-duration.component';
import { AddDurationComponent } from './add-duration/add-duration.component';
import { AddPaymentComponent } from './add-payment/add-payment.component';
import { EditPaymentComponent } from './edit-payment/edit-payment.component';
import { TypesTemplateComponent } from './types-template/types-template.component';
import { EditTypeComponent } from './edit-type/edit-type.component';
import { AddTypeComponent } from './add-type/add-type.component';


@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    SettingsWrapperComponent, 
    SettingsListComponent, 
    TemplateComponent, 
    DiyComponent, 
    PaymentComponent, 
    EditDurationComponent, 
    AddDurationComponent, 
    AddPaymentComponent, 
    EditPaymentComponent, 
    TypesTemplateComponent, 
    EditTypeComponent, 
    AddTypeComponent
  ],
  exports:[
    SettingsWrapperComponent, 
    SettingsListComponent,
    TemplateComponent, 
    DiyComponent, 
    PaymentComponent, 
    EditDurationComponent, 
    AddDurationComponent, 
    AddPaymentComponent, 
    EditPaymentComponent, 
    TypesTemplateComponent, 
    EditTypeComponent, 
    AddTypeComponent
  ],
  entryComponents:[
    AddDurationComponent, 
    AddPaymentComponent, 
    AddTypeComponent
  ]
})
export class SettingsModule { }
