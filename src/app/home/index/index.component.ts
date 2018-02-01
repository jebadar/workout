import { Component, OnInit } from '@angular/core';
import { InlineLoginComponent } from  '../../users/inline-login/inline-login.component'
import { Constants } from  '../../constants'

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['../../layout/index-main/index-main.component.css']
})
export class IndexComponent implements OnInit {
  assetsUrl = Constants.ASSET_URL;
  constructor(
  ) { }

  ngOnInit() {
  }
}
