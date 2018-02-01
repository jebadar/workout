import { Component, OnInit, ViewEncapsulation ,Input } from '@angular/core';

@Component({
  selector: 'preview-drill-component',
  templateUrl: './preview-drill.component.html',
  styleUrls: ['./preview-drill.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PreviewDrillComponent implements OnInit {
@Input() close;
@Input() drill;
@Input() counter;
  constructor() { }

  ngOnInit() {
    console.log(this.drill);
  }
  closeme(e){
    this.close(this.counter);
  }

  ignoreClick(e){
    e.stopPropagation();
  }
}
