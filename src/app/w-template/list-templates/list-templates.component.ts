import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from "ng2-bootstrap-modal";
import { LoaderComponent } from '../../shared/loader/loader.component';
import { WTemplateService } from '../w-template.service';
import { SettingsService } from '../../settings/settings.service';
import { ConfirmComponent } from "../../shared/confirm/confirm.component";

@Component({
  selector: 'list-templates-component',
  templateUrl: './list-templates.component.html',
  styleUrls: ['./list-templates.component.css']
})
export class ListTemplatesComponent implements OnInit {

  constructor(
    private templateService: WTemplateService,
    private settingsService: SettingsService,
    private dialogService: DialogService
  ) { }

  loading = false;
  templateTypes
  templates: any = [];

  durations: any = [];
  selectedDurations = null;

  //filter vairables
  limit =10;
  page = 0;
  name = "";
  type = null;
  loadMoreCheck = false;
  //CSS variables

  ngOnInit() {
    this.fetchTemplate();
    this.fetchDurations();
    this.fetchTemplateTypes();
  }

  fetchTemplate() {
    this.loading = true;
    this.templateService.getTemplates(this.limit, this.page, this.name, this.selectedDurations, this.type)
      .subscribe(data => {
        if (this.templates.length < 1) {
          this.templates = data.json().template
        } else {
          let tempTemplate = data.json().template
          if (tempTemplate.length < 1) {
            this.loadMoreCheck = true;
          } else {
            this.pushTemplate(tempTemplate)
          }
        }
        this.loading = false;
      });
  }
  pushTemplate(templates) {
    templates.forEach(item => {
      this.templates.push(item);
    });
  }
  searchTemplate() {
    this.templates = [];
    this.limit = 7;
    this.page = 0;
    this.loadMoreCheck = false;    
    this.fetchTemplate()
  }
  onScroll() {
    if (!this.loadMoreCheck) {
      this.page++;
      this.fetchTemplate()
    }
  }
  fetchTemplateTypes() {
    this.templateService.getTemplateTypes()
      .subscribe(data => {
        this.templateTypes = data.json();
      });
  }

  fetchDurations(){
    this.settingsService.getDurations()
    .subscribe(data => {
      this.durations = data.json();
      this.durations.sort((a,b)=>a.minutes-b.minutes);
      this.loading = false;
    })
  }

  deleteTamplate(templateId){
    let noPurpose = "";
    let tempObj=null;

    this.templates.forEach(item=>{
      if(item.id===templateId){
        tempObj = item;
      }
    });

    if(!tempObj){
      return;
    }
    
    let disposable = this.dialogService.addDialog(ConfirmComponent, {
      noPurpose: noPurpose
    })
    disposable.subscribe((response) => {
      if(response){
        tempObj.deleting = true;
        this.templateService.deleteTemplate(templateId)
          .subscribe(data=>{
            let delIndex = -1;
            tempObj.deleting = false;
            this.templates.forEach((item, index)=> {
              if (item.id===tempObj.id){
                delIndex = index;
              } 
            });
            if(delIndex>-1){
              this.templates.splice(delIndex,1);
            }
          }, err=>{
            tempObj.deleting = false;
          })
      }
    });
  }
}
