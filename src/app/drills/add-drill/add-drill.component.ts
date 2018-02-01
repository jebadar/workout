import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../category/category.service';
import { DrillsService } from '../drills.service';
import { UploaderComponent } from '../../shared/uploader/uploader.component';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import { DrillCategoriesComponent } from '../drill-categories/drill-categories.component';

@Component({
  selector: 'add-drill-component',
  templateUrl: './add-drill.component.html',
  styleUrls: ['../../layout/admin/admin.component.css']
})
export class AddDrillComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private drillsService: DrillsService,
    public toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  loader = false;
  majorId = null;
  minorId = null;
  subId = null;
  video = "video";
  image = "image";
  videoId = null;
  imageId = null;
  drillForm: FormGroup;
  model: any = {};
  drillId;
  drill: any = {};
  edit = false;
  formCheck = false;
  title="";
  description="";
  duration=0;
  mediaData = {
    imageURL: null,
    videoURL: null
  };
  categoriesData = {
    majorId: null,
    minorId: null,
    subId: null
  };
  imageURL = null;
  videoURL = null;
  public editorContent: string = "";
  options: Object;
  editDataFetched = false;


  ngOnInit() {
    this.loader = true;
    this.drillForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required
      ]),
      duration: new FormControl(null, [
        Validators.required
      ])
    });

    this.imageFunction = this.imageFunction.bind(this);
    this.videoFunction = this.videoFunction.bind(this);
    this.selectCategoryFunction = this.selectCategoryFunction.bind(this);

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.drillId = params.id;
        if (this.drillId == undefined || this.drillId == 'null') {
          this.edit = false;
        }
        else {
          this.edit = true;
          this.fetchDrill(params.id);
        }
      }
    });

    let that = this;
    this.options = {
      height: 300,
      placeholderText: "Enter drill description...",
      events: {
        'froalaEditor.contentChanged': function (e, editor) {
          that.editorContent = editor.html.get();
          that.formStatus();
        }
      }
    }
    this.loader = false;
  }

  fetchDrill(id) {
    this.drillsService.getDrillById(id)
      .subscribe(data => {
        let res = data.json();
        this.updateForm(res);
      }, error => { });
  }

  updateForm(res) {
    res = res[0];
    this.title = res.name;
    this.duration = res.duration;
    this.editorContent = res.description;
    this.imageId = res.image_id;
    this.videoId = res.video_id;
    this.subId = res.drillsubs.id;
    this.minorId = res.drillsubs.minors.id;
    this.majorId = res.drillsubs.minors.drill_majors.id;
    this.categoriesData.majorId = res.drillsubs.minors.drill_majors.id;
    this.categoriesData.minorId = res.drillsubs.minors.id;
    this.categoriesData.subId = res.drillsubs.id;

    if (res.image != null) {
      this.mediaData.imageURL = res.image.name;
    }

    if (res.video != null) {
      this.mediaData.videoURL = res.video.name;
    }

    this.editDataFetched = true;
    this.formStatus();
  }

  selectCategoryFunction = function (id, type) {
    if (type == "major") {
      this.majorId = id;
      this.minorId = null;
      this.subId = null;
    }
    else if (type == "minor") {
      this.minorId = id;
      this.subId = null;
    }
    else if (type == "sub") {
      this.subId = id;
    }
    this.formStatus();
  }

  imageFunction = function (id) {
    this.imageId = id;
    this.formStatus();
  }

  videoFunction = function (id) {
    this.videoId = id;
    this.formStatus();
  }


  formStatus() {
    if (this.title != "" && this.editorContent != "" && this.duration > 0 && this.subId != null && this.imageId != null && this.videoId != null) {
      this.formCheck = true;
    }
    else {
      this.formCheck = false;
    }
  }
  submitForm() {
    if (this.drillForm.get('title').status == 'VALID') {
      this.model.name = this.drillForm.get('title').value;
    } else {
      this.toastr.warning("Title is required");
    }
    if (this.drillForm.get('duration').status == 'VALID') {
      this.model.duration = this.drillForm.get('duration').value;
    } else {
      this.toastr.warning("Duration is required");
      return
    }
    if (this.drillForm.status == 'VALID') {
      this.model.description = this.editorContent;
      this.model.video_id = this.videoId;
      this.model.image_id = this.imageId;
      this.model.sub_id = this.subId;
      this.model.major_id = this.majorId;
      this.model.minor_id = this.minorId;
      this.model.status = 1;

      if (this.edit == true) {
        this.loader = true;
        this.drillsService.updateDrill(this.drillId, this.model)
          .subscribe(data => {
            let res = data.json()
            this.loader = false;
            this.toastr.success('Drill Updated');
          },
          error => {
            this.loader = false;
          })
      }
      else if (this.edit == false) {
        this.loader = true;
        this.drillsService.addDrill(this.model)
          .subscribe(data => {
            let res = data.json()
            this.loader = false;
            this.toastr.success('Drill Added');
            this.router.navigate(['admin/drills/edit/'+res[0].id]);
          },
          error => {
            let res = error.json()
            this.loader = false; 
          })
      }


    }

  }

}
