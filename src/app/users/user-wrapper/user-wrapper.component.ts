import { Component, OnInit } from '@angular/core';
import { TitleService } from '../../shared/titleService/titleService'


@Component({
  selector: 'app-user-wrapper',
  templateUrl: './user-wrapper.component.html',
  styleUrls: ['./user-wrapper.component.css']
})
export class UserWrapperComponent implements OnInit {

  constructor(private titleService: TitleService) { }

  ngOnInit() {
    setTimeout(()=>{this.titleService.setTitle("Manage Users");},0);
  }

}
