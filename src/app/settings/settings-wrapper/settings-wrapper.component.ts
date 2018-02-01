import { Component, OnInit } from '@angular/core';
import { TitleService } from "../../shared/titleService/titleService";

@Component({
  selector: 'app-settings-wrapper',
  templateUrl: './settings-wrapper.component.html',
  styleUrls: ['./settings-wrapper.component.css']
})
export class SettingsWrapperComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Application Settings");},0);
  }

}
