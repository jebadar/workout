import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'loader-red',
  templateUrl: './loader-red.component.html',
  styleUrls: ['./loader-red.component.css']
})
export class LoaderRedComponent implements OnInit {

    @Input() width:number;

constructor() {

 }

ngOnInit() { 
    if(this.width==undefined){
        this.width=100;
    }
}

}