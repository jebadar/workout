import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-main-wrapper',
  templateUrl: './main-wrapper.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class MainWrapperComponent implements OnInit {

  constructor(
    private router: Router,
  ) { }
  
  ngOnInit() {
  }

}
