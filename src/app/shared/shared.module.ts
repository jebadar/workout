import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoaderComponent } from './loader/loader.component';
import { LoaderRedComponent } from './loader-red/loader-red.component';
import { UploaderComponent } from './uploader/uploader.component'
import { FileUploadModule } from 'ng2-file-upload';
import { ConfirmComponent } from './confirm/confirm.component';

@NgModule({
  imports: [
    CommonModule,
    FileUploadModule
  ],
  declarations: [ 
    LoaderComponent, 
    UploaderComponent, 
    ConfirmComponent,
    LoaderRedComponent
  ],
  exports:[ 
    LoaderComponent ,
    UploaderComponent, 
    ConfirmComponent,
    LoaderRedComponent
  ],
  entryComponents:[ 
    ConfirmComponent
  ]
})
export class SharedModule { }
