import { Component, OnInit, Renderer2, EventEmitter, Output, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-scroll-behaviour',
  templateUrl: './scroll-behaviour.component.html',
  styleUrls: ['./scroll-behaviour.component.scss']
})
export class ScrollBehaviourComponent implements OnInit {

  @Input() singleEmit: boolean = true;
  @Input() disabled: boolean = false;
  @Output() onScrollToBottom = new EventEmitter();  
  @ViewChild('scrollItem') scrollItem;

  private emmitedValues: number[] = [];

  constructor(private renderer: Renderer2) { 
    this.renderer.listen('window', 'scroll', (e) => {
      this.onScroll(this.scrollItem);
    })
  }

  ngOnInit(): void {
  }

  private onScroll(e) {
    let doc = window.event.target['documentElement'];
    
    // Verifica se o scroll está no final da pagina
    if (doc.scrollTop + doc.offsetHeight >= this.scrollItem.nativeElement.offsetTop) {
      // Verifica se esse scroll ja foi emitido
      if (!this.disabled) {
        console.log("SCROLL BOTTOM EVENT")
        this.onScrollToBottom.emit(doc.scrollTop)
      }
    }
  }
}
