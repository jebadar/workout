import { Component, OnInit } from '@angular/core';
import { TitleService } from "../../shared/titleService/titleService";

@Component({
  selector: 'template-wrapper-component',
  templateUrl: './template-wrapper.component.html',
  styleUrls: ['./template-wrapper.component.css']
})
export class TemplateWrapperComponent implements OnInit {

  constructor(
    private titleService: TitleService
  ) { }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Manage Templates");},0);
  }

}
