import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CollapseDirective } from 'ngx-bootstrap';
import { Constants } from  '../../constants'

@Component({
  selector: 'app-index-main',
  templateUrl: './index-main.component.html',
  styleUrls: ['./index-main.component.css']
})
export class IndexMainComponent implements OnInit {
  assetsUrl = Constants.ASSET_URL;
  constructor(
    private router: Router
  ) { }

  public isCollapsed: boolean = true;
  ngOnInit() {
  }
  collapseMenu()
  {
    this.isCollapsed = !this.isCollapsed;
  }
}
