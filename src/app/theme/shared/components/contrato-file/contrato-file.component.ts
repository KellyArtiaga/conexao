import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-contrato-file',
  templateUrl: './contrato-file.component.html',
  styleUrls: ['./contrato-file.component.scss'],

})
export class ContratoFileComponent implements OnInit {

  @Input() data:any = {}

  constructor() { }

  ngOnInit(): void {
  }

}
