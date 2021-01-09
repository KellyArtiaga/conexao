import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { NgbCalendar, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-contrato-empresas',
  templateUrl: './contrato-empresas.component.html',
  styleUrls: ['./contrato-empresas.component.scss']
})
export class ContratoEmpresasComponent implements OnInit {
  form: FormGroup;
  private filesControl = new FormControl(null, FileUploadValidators.filesLimit(2));
  modelCustomDay: any;

  public demoForm = new FormGroup({
    files: this.filesControl
  });

  constructor() { }

  ngOnInit() {
  }

  isDisabled(date: NgbDateStruct, current: { month: number }) {
    return date.month !== current.month;
  }

  exportToPDF() {
    var conteudo = document.getElementById('contract').innerHTML,
      tela_impressao = window.open('about:blank');

    tela_impressao.document.write(conteudo);
    tela_impressao.window.print();
    tela_impressao.window.close();

  }
}

