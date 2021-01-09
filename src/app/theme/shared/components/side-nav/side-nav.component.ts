import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.scss']
})
export class SideNavComponent implements OnInit {

  @Input() items: string[] = [];
  @Input() errors: string[] = []; 
  @Output() onChange = new EventEmitter();
  @Input() selected: number = 0;
  @Input() image: string = "";


  constructor() { }

  ngOnInit() {
  }

  change(index: any): void {
    this.selected = index;
    this.onChange.emit(this.selected);
  }

  hasError(item: string):boolean {
    if (this.errors.indexOf(item) !== -1) {
      return true;
    }
    return false;
  }
}
