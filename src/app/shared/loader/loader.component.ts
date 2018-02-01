import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'loader-component',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

    @Input() width:number;

constructor() {

 }

ngOnInit() { 
    if(this.width==undefined){
        this.width=150;
    }
}

}