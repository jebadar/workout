import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter, ChangeDetectorRef, Input } from '@angular/core';
import { FileUploader, FileItem, ParsedResponseHeaders, FileUploaderOptions } from 'ng2-file-upload';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { UserService } from '../../users/user.service';
import { Constants } from '../../constants';

const URL = Constants.MEDIA_URL;
@Component({
  selector: 'uploader-component',
  templateUrl: './uploader.component.html',
  styleUrls: ['../../layout/admin/admin.component.css']
})
export class UploaderComponent implements OnInit {
  @Input() type;
  @Input() mediaId;
  @Input() edit;
  @Input() mediaURL;

  @ViewChild('uploadButton') fileRef: ElementRef;
  public uploader: FileUploader;
  accessTokken: string;
  media_id: string;
  media_url: string;
  media_type: string;
  post_image = 0;
  uploadedImage: string;
  progress_bar:number=0;
  video=false;
  image=false;
  title: string;
  description: string;
  category;
  diagram_upload;
  video_upload;
  duration;
  hide = true;
  uploadFlag = false;
  progress=false;


  constructor(
    private userServicesService: UserService,
    private toastr: ToastsManager,
    private changeDetector: ChangeDetectorRef
  ) {
    }
  onSuccessItem(item: FileItem, response: string, status: number, headers: ParsedResponseHeaders): any {
    let data = JSON.parse(response);
    this.media_id = data.id;
    this.post_image = 2;
    this.toastr.success('File uploaded');
    this.media_url=data.name;
    this.mediaId(data.id);
    this.progress=false;
  }

  ngOnInit() {
    this.media_type=this.type;
    this.mediaUploader();
    if(this.edit==true){
      this.post_image=2;
      if(this.media_type=='image'){
        this.media_url=this.mediaURL.imageURL;
      }
      else if(this.media_type=='video'){
        this.media_url=this.mediaURL.videoURL;
      }
    }
  }
  
  progressBar(){
    return this.progress_bar;
  }

  removeMedia(){
    this.video=false;
    this.image=false;
    this.post_image=0;
    this.progress_bar=0;
    this.mediaId(null);
    this.mediaUploader();
  }

  mediaUploader(){
    if(this.media_type=='image'){
      this.video=false;
      this.image=true;
      this.uploader = new FileUploader({ url: URL, allowedMimeType: ['image/png', 'image/jpeg'] });
    }
    else if(this.media_type=='video'){
      this.video=true;
      this.image=false;
      this.uploader = new FileUploader({ url: URL, allowedMimeType: ['video/mp4'] });
    }

    this.accessTokken = this.userServicesService.getToken();
    
    
    this.uploader.authToken = this.accessTokken;
    var uo: FileUploaderOptions = {};
    uo.headers = [{ name: 'Authorization', value: 'Bearer ' + this.accessTokken }]
    this.uploader.setOptions(uo);
    this.uploader.onAfterAddingFile = (file) => {
      if(this.media_type=='image'){
        file.alias = "image";
      }
      else if(this.media_type=='video'){
        file.alias = "video";
      }
      
      this.fileRef.nativeElement.click();
      this.uploadedImage = file.file.name;
      this.post_image = 1;
      this.progress=true;
    }
    this.uploader.onWhenAddingFileFailed = (file) => {
      if(this.media_type=='image'){
        this.toastr.error('Oops!, Only JPEG or PNG images allowed');
      }
      else if(this.media_type=='video'){
        this.toastr.error('Oops!, Only MP4 videos allowed');
      }
      this.post_image = 0;
      // this.uploader = new FileUploader({ url: URL, allowedMimeType: ['image/png', 'image/jpeg'] });
    }
    this.uploader.onProgressAll = (progress: any) =>{
      this.changeDetector.detectChanges();
      this.progress_bar=progress;
    } 
    this.uploader.onErrorItem = (file) => {
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => this.onSuccessItem(item, response, status, headers);
  
  }

  
}
