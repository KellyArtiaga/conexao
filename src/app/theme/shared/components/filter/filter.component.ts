import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() placeholder = "Busque por cliente, CNPJ, telefone, nome de contato ou e-mail";
  @Input() changeTimeout = 500;
  @Output() onChange = new EventEmitter();
  public timer = null;
  public open = false;
  public value = "";

  constructor() { }

  ngOnInit() {
  }

  dispatchEvent(value: string): void {
    console.log("Dispatching event...\"" + value + "\"");
    this.onChange.emit(value)
  }


  collapse(): void {
    this.open = !this.open
  }

  onInput(event: any): void {
    clearTimeout(this.timer)
    this.timer = setTimeout(() => this.dispatchEvent(event.target.value), this.changeTimeout);
  }

}
