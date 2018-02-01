import { Component, OnInit } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormGroup, Validators, FormControl } from "@angular/forms";
import { Router, ActivatedRoute, Params } from '@angular/router';
import { LoaderComponent } from '../../shared/loader/loader.component';
import { CategoryService } from '../../category/category.service';
import { SettingsService } from '../../settings/settings.service';
import { WTemplateService } from '../w-template.service';
import { TemplateCategoriesComponent } from '../template-categories/template-categories.component';

@Component({
  selector: 'add-template-component',
  templateUrl: './add-template.component.html',
  styleUrls: ['./add-template.component.css']
})
export class AddTemplateComponent implements OnInit {

  constructor(
    private categoryService: CategoryService,
    private settingsService: SettingsService,
    private templateService: WTemplateService,
    public toastr: ToastsManager,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  allLoaded = [];
  fetchingData = false;
  type = null;
  duration_id = null;
  name = null;
  minorObject;
  loader = false;
  durations;
  templateTypes;
  arr = Array;
  minors = [];
  count = 0;
  templateForm: FormGroup;
  model: any = {
    name: "",
    duration_id: null,
    title_id: null,
    minor: [],
    number_of_drills: 0
  };
  formCheck = false;
  edit = false;
  editDataFetched = false;
  templateId;
  //CSS Variables
  widthCard = '';
  textHeading  = "Add";
  
  ngOnInit() {
    this.fetchDuration()
    this.fetchTemplateTypes()
    this.addCategoryFunction = this.addCategoryFunction.bind(this);
    this.count = this.model.number_of_drills;
    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.templateId = params.id;
        if (this.templateId == undefined || this.templateId == 'null') {
          this.edit = false;
          
        }
        else {
          this.edit = true;
          this.fetchTemplate(this.templateId);
          this.textHeading = "Edit"
        }
      }
    });
  }
  
  fetchTemplateTypes()
  {
    this.loader = true;
    this.templateService.getTemplateTypes()
      .subscribe(data => {
        this.templateTypes = data.json();
        this.allDataLoaded("type");
      }, err=>{
        this.allDataLoaded("type");
      });
  }
  fetchDuration(){
    this.loader = true;
    this.settingsService.getDurations()
      .subscribe(data => {
        this.durations = data.json();
        this.allDataLoaded("duration");
      }, err=>{
        this.allDataLoaded("duration");
      });
  }
  fetchTemplate(id) {
    this.loader = true;
    this.fetchingData = true;
    this.templateService.getTemplate(id)
      .subscribe(data => {
        let res = data.json()[0];
        this.updateForm(res);
        this.allDataLoaded("template");
        
      }, error => {
        this.allDataLoaded("template");
       });
  }

  allDataLoaded(resource){
    this.allLoaded.push(resource);
    if(this.edit == false && this.allLoaded.length>1){
      this.loader = false;
      this.fetchingData = false;
    } else if(this.edit == true && this.allLoaded.length>2){
      this.loader = false;
      this.fetchingData = false;
    }
  }

  updateForm(res) {
    this.model.name = res.name;
    
    this.model.title_id = res.title_id;
    this.model.duration_id = res.duration_id;
    
    this.minorObject = res.details;
    let i = res.details.length;
    for (var j = 0; j < i; j++) {
      this.addCategoryFunction(res.details[j].minor_id,j)
      this.model.number_of_drills++;
    }
    
    this.validate();
  }


  addCategoryFunction = function (id, counter) {
    this.model.minor[counter] = id;
    this.validate();
  };

  changeDrills() {
    if (this.model.number_of_drills < this.count) {
      this.model.minor.pop();
    }
    this.count = this.model.number_of_drills;
    this.validate();
  }

  validate(){
    let validator = true;
    if(!this.model.name || this.model.name==""){
      validator = false;
    }

    if(!this.model.templateId){
      validator = false;
    }

    if(!this.model.duration_id){
      validator = false;
    }

    if (this.model.number_of_drills > 0 && this.model.minor.length > 0 && this.model.number_of_drills == this.model.minor.length) {
      validator = true;
    } else {
      validator = false;
    }

    this.formCheck = validator;
    return this.formCheck;
  }
  
  submitForm() {
    if (this.validate() == true) {
      
      if(this.edit)
      {
        this.putTemplate();
      }else{
        this.postTemplate();        
      }
    }
  }
  putTemplate(){
    this.loader = true;
    this.templateService.editTemplate(this.templateId,this.model)
    .subscribe(data => {
      this.loader = false;
      let res = data.json()
      this.toastr.success('Template Added');
    },
    error => {
      let res = error.json()
      this.toastr.error('Error, Please try again!');
    })
  }
  postTemplate(){
    this.loader = true;
    this.model.free_time = 0;
    this.templateService.addTemplate(this.model)
    .subscribe(data => {
      let res = data.json()
      this.loader = false;
      this.toastr.success('Template Added');
      this.router.navigate(['admin/templates/edit/'+res[0].id]);
    },
    error => {
      this.loader = false;
      let res = error.json()
      // this.toastr.error('Error, Please try again!');
    })
  }
}
