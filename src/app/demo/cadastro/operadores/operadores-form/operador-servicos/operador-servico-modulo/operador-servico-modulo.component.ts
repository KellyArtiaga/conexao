import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { stringify } from 'querystring';
import { LoginService } from 'src/app/demo/services/login.service';
import { ModulosService } from 'src/app/demo/services/modulos.service';
import { PhotoService } from 'src/app/demo/services/photo.service';
import { AuthSigninPOST } from 'src/app/demo/pages/authentication/auth-signin/auth-signin-post';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { IOption } from 'ng-select';
import { resolve } from 'url';
import { TenantModel } from 'src/app/demo/models/tenant-model';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadValidators } from '@iplab/ngx-file-upload';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { toInteger } from '@ng-bootstrap/ng-bootstrap/util/util';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthGuardService } from '../../../../../../../guards/auth.guard';
import { PricePipe } from '../../../../../pipes/pricePipe.component';

@Component({
  selector: 'app-operador-servico-modulo',
  templateUrl: './operador-servico-modulo.component.html',
  styleUrls: ['./operador-servico-modulo.component.css']
})
export class OperadorServicoModuloComponent implements OnInit {
@Pipe({ name: 'reverse' })

  form: FormGroup;
  isSubmit: boolean;
  isUserAdmin: boolean;
  isAdminRole: boolean;
  operadorId = null;
  isFixoMensal:boolean;
  tipoModulos: Object[] = [];
  tipoPrecificacao: Object[] = [];
  isDelete: boolean;
  invalidFaixa: any;
  faixasNoDeleted: [];

  isLastFaixa:boolean;
  isValid: boolean;
  noFaixa=false;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: ModulosService,
    private photoService: PhotoService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    public auth: AuthGuardService,
    public pricePipe: PricePipe
  ) {
    this.isSubmit = false;
    this.isAdminRole = false;
    this.isUserAdmin = service.isUserAdmin();
  }

  ngOnInit() {
    this.operadorId = this.route.snapshot.paramMap.get('operadorId');
    this.createForm();
    this.getSelectValues();
    this.getData();
    this.getNoDeleted();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.route.snapshot.paramMap.get('id') || null],
      idPreco: [null],
      modulo: ['', Validators.required],
      tipoRemuneracao: ['', Validators.required],
      faixasPreco: [null],

      cobrancaPedidos: [true],
      cobrancasCancelamentos: [true],
      cobrancaNaoEntregues: [true],

      sms: [false],
      whatsapp: [false],

      valorSms: new FormControl({value: "", disabled: false}),
      valorWhatsapp: new FormControl({value: "", disabled: false}),
    });
  }

  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }

  getData() {
    if (!this.form.value.id) {
      return false;
    }
    this.service.getById(this.form.value.id)
    .subscribe(result => {
      var data = result.data
      this.form.get('modulo').setValue(data.modulo || "");
      this.form.get('tipoRemuneracao').setValue(data.precos[0].tipoRemuneracao || "")
      this.form.get('faixasPreco').setValue((data.precos[0].faixasPreco))
      data.precos[0].faixasPreco.map((faixa, index) => {
        this.faixaItemToPrice({Dname: "valor", Dval: faixa.valor}, index)
      })

      this.form.get('cobrancaPedidos').setValue(data.precos[0].cobrancaPedidos || "")
      this.form.get('cobrancasCancelamentos').setValue(!data.precos[0].cobrancasCancelamentos || "")
      this.form.get('cobrancaNaoEntregues').setValue(!data.precos[0].cobrancaNaoEntregues || "")

      this.form.get('sms').setValue(data.precos[0].valorSms && data.precos[0].valorSms != "")
      this.form.get('whatsapp').setValue(data.precos[0].valorWhatsapp && data.precos[0].valorWhatsapp != "")

      this.form.get('valorSms').setValue(this.pricePipe.transform(data.precos[0].valorSms, 4) || "")
      this.form.get('valorWhatsapp').setValue(this.pricePipe.transform(data.precos[0].valorWhatsapp, 4) || "")

      this.form.get('idPreco').setValue(data.precos[0].id || "")
      if(this.form.value.tipoRemuneracao != ''){
        this.getTipo(this.form.value.tipoRemuneracao, true)
      }
    this.getFaixas(this.form.value);
    })
  }

  getFaixas(obj?){
    var novaFaixa = this.filterFaixas();
    var lastFaixaIndex = (novaFaixa.length) - 1;

    for (let index = 0; index < novaFaixa.length; index++) {
      const element = novaFaixa[index];
      element.isLastFaixa = false;
    }

    if(novaFaixa[lastFaixaIndex]){
      novaFaixa[lastFaixaIndex].isLastFaixa = true;
    }
  }

  getSelectValues() {
    this.service.getModulos()
    .subscribe(result => {
      result.data.map(r => {
        this.tipoModulos.push({label: r.replace("_", " "), value: r})
      })
    })

    this.service.getTiposPrecificacao()
    .subscribe(result => {
      result.data.map(r => {
        this.tipoPrecificacao.push({label: r.replace("_", " "), value: r})
      })
    })
  }

  // create a list without deleted items
  getNoDeleted(faixas?:any){
    if(faixas){
      this.faixasNoDeleted = faixas.filter(p => p.deleted !== true)
    }else{
      this.faixasNoDeleted = []
    }
  }

  // adding list items
  novaFaixa(event?: any) {
    var faixas = this.form.value.faixasPreco;
    var novaFaixa = this.filterFaixas();
    var index = novaFaixa.length>=0 ? novaFaixa.length-1: "";
    this.valideFaixa();
      this.noFaixa = false;

  	if (novaFaixa.length === 0 && novaFaixa) {
      this.form.value.faixasPreco = []
      this.form.value.faixasPreco.push({quantidadePedidos_inicio: 1, quantidadePedidos_fim: "", valor: ""})
      var faixas = this.form.value.faixasPreco;
      var novaFaixa = this.filterFaixas();

    }else{
      this.valideFaixa();
      var lastQuantidadePedidos_fim = novaFaixa ? +novaFaixa[index].quantidadePedidos_fim : null;
      var lastQuantidadePedidos_valor = novaFaixa[index].valor ? true : false;
      if(lastQuantidadePedidos_fim === 999999999){
          this.snackBar.error('999.999.999 é a faixa máxima permitida', 3000, 'X');
      }else if(!(lastQuantidadePedidos_fim >=1) || !(lastQuantidadePedidos_fim >=1) || lastQuantidadePedidos_valor===false){
          this.isValid = false;
          novaFaixa[index].error= true;
        }else{
        if(this.isValid){
            this.isValid = true;
            novaFaixa[index].error= false;
            faixas.push({quantidadePedidos_inicio: lastQuantidadePedidos_fim + 1, quantidadePedidos_fim: "", valor: ""})
        }
      }
    }
    this.CheckFaixasLength();
    this.getFaixas(this.form.value);

  }

  CheckFaixasLength(){
  var novaFaixa = this.filterFaixas();
    if(novaFaixa.length>0){
      this.noFaixa = false
    }else{
      this.noFaixa = true
    }
  }

  faixaItemChange(v, index) {
    var faixas = this.form.value.faixasPreco ? this.form.value.faixasPreco : null;
    faixas[index][v.target.name] = v.target.value
    this.form.get('faixasPreco').setValue(faixas)
    this.valideFaixa();
  }

  valideFaixa(){
    var novaFaixa = this.filterFaixas();
    this.isValid = true;

    if (!(novaFaixa.length === 0 && novaFaixa)) {
      for (let index = 0; index < novaFaixa.length; index++) {
      var element = novaFaixa[index];
      var inicio = novaFaixa.length>=0 ? parseInt(element.quantidadePedidos_inicio) : null;
      var fim = novaFaixa.length>=0  ? parseInt(element.quantidadePedidos_fim) : null;
      var QuantidadePedidos_valor = element.valor ? true : false;

      if(inicio != 0 && fim != 0 && QuantidadePedidos_valor != false ){
        if(inicio >= fim){
          this.snackBar.error('Ordem de faixa fim não pode ser menor ou igual a faixa início!', 3000, 'X');
            this.isValid = false;
            element.error = true;
          } else if ((index>0) && (inicio <= novaFaixa[index - 1].quantidadePedidos_fim)){
              this.snackBar.error('Ordem de faixa não pode ser menor ou igual a faixa anterior!', 3000, 'X');
              this.isValid = false;
              element.error = true;
          } else if(fim > 999999999){
            this.snackBar.error('Quantidade final não pode ser superior a 999.999.999!', 3000, 'X');
              this.isValid = false;
              element.error = true;
          } else {
          this.isValid = true;
          element.error = false;
        }
      }
       if( !(fim) || QuantidadePedidos_valor===false){
        this.snackBar.error('Existem campos obrigatórios a serem preenchidos.', 3000, 'X');
        this.isValid = false;
        element.error = true;}
      }
    }
  }

  filterFaixas(){
    var faixas = this.form.value.faixasPreco ? this.form.value.faixasPreco : '';
    let novaFaixa = []
    if(faixas.length>=0){
      for (let index = 0; index < faixas.length; index++) {
        if(!faixas[index].deleted){
          novaFaixa.push(faixas[index]);
        }
      }
    }
    return novaFaixa;
  }

  faixaItemToPrice(e, index) {
    var faixas = this.form.value.faixasPreco;
    if (!faixas) {
      faixas = []
    }
    if(e){
      var value = e.Dval || e.target.value;
      if (typeof value === 'string') {
        value = value.replace(/[^\d]/g, '')
        if (value.length > 2) {
          value = value.substring(0, value.length-2) + "," + value.substring( value.length-2);
        }
      }
      else {
        value = value.toFixed(2).replace('.', ',')
      }
    }
    faixas[index][e.Dname || e.target.name] = value
    this.form.get('faixasPreco').setValue(faixas)
  }

  excluirFaixa(e, index) {
    e = this.form.value

    var faixas = this.form.value.faixasPreco;
    if (!faixas) {
      faixas = []
    }
    faixas[index].deleted = true;
    // this.faixaDeleted();
    this.form.get('faixasPreco').setValue(faixas);
    this.getFaixas(this.form.value)
  }

  isFaixaValid(faixa: any, index: number): boolean {
    var v = this.form.value
    var isValid: boolean = true;

    v.faixasPreco.map((fb, ib) => {
      if (index != ib) {
        if (faixa.quantidadePedidos_inicio <= fb.quantidadePedidos_fim && faixa.quantidadePedidos_inicio >= fb.quantidadePedidos_inicio) {
          isValid = false;
        }
        else if (faixa.quantidadePedidos_fim <= fb.quantidadePedidos_fim && faixa.quantidadePedidos_fim >= fb.quantidadePedidos_inicio) {
          isValid = false;
        }else{
          isValid = true;
        }
      }
    })
    if (faixa.quantidadePedidos_inicio > faixa.quantidadePedidos_fim) {
      isValid = false;
    }
    return isValid
  }

  onlyNumbers(str: string, allowDots: boolean = false): string {
    if (allowDots) {
      return str.toString().replace(/[^0-9.]/g, '');
    }
    else {
      return str.toString().replace(/[^0-9]/g, '');
    }
  }

  toPrice(text, decimals = 2) {
    var parsedStr = text.toString().replace(/[^0-9]/g, '');
    var chars = parsedStr.split('');
    var result = ""
    if (chars.length > decimals) {
      chars.map((char, index) => {
        result += char;
        if (index == chars.length - (decimals+1)) {
          result += ".";
        }
      })
    }
    else {
      result = parsedStr;
    }
    return result
  }

  getTipo(event, isEdit?:boolean){
    var faixas = this.form.value.faixasPreco;
    if(faixas!= null){
      if(event.value === 'FIXO_MENSAL' || this.form.value.faixasPreco === 'FIXO_MENSAL' || event === 'FIXO_MENSAL'){
        if(!isEdit){
          for (let index = 0; index < faixas.length; index++) {
            const element = faixas[index];
            element.deleted = true;
          }
          this.form.value.faixasPreco
          this.form.value.faixasPreco.push({quantidadePedidos_inicio: 1, quantidadePedidos_fim: 999999999, valor: ""})
        }
          this.isFixoMensal = true;
        } else {
          this.isFixoMensal = false
        }
  }
}

async save(form:any) {
  var v = this.form.value
  var faixaValid = true
  if (v.faixasPreco!=null){
    v.faixasPreco.map((faixa, index) => {
    if(faixa.valor){
      v.faixasPreco[index].valor = faixa.valor.replace(",", ".")
      v.faixasPreco[index].valor = this.onlyNumbers(this.toPrice(v.faixasPreco[index].valor), true);

      v.faixasPreco[index].quantidadePedidos_inicio = this.onlyNumbers(v.faixasPreco[index].quantidadePedidos_inicio);
      v.faixasPreco[index].quantidadePedidos_fim = this.onlyNumbers(v.faixasPreco[index].quantidadePedidos_fim);
      if(!this.isFaixaValid(faixa, index)) {
        faixaValid = false;
        faixa.error = true;
      }else{
        faixaValid = true;
        faixa.error = false;
      }
    }});
  }

  this.valideFaixa();
  if(this.isValid && form.valid){
      var body = {
        operador: {id: this.operadorId},
        active: true,
        modulo: v.modulo,
        precos: [{
          id: v.idPreco? v.idPreco : '',
          tipoRemuneracao: v.tipoRemuneracao,
          valorSms: v.sms ? this.onlyNumbers(this.toPrice(v.valorSms, 4), true) : "",
          valorWhatsapp: v.whatsapp ? this.onlyNumbers(this.toPrice(v.valorWhatsapp, 4), true) : "",
          cobrancaPedidos: v.cobrancaPedidos,
          cobrancasCancelamentos: !v.cobrancasCancelamentos,
          cobrancaNaoEntregues: !v.cobrancaNaoEntregues,
          faixasPreco: v.faixasPreco || [],
        }]
      }
      if (v.id && v.id != "") {
          body['id'] = v.id
          body['operador'] = {id: this.operadorId}
          if (v.idPreco) {
            body.precos[0]['id'] = v.idPreco
          }
          this.service.put(body)
          .subscribe(res => {
            this.snackBar.success('Atualizado com sucesso!', 3500, 'X');
            this.router.navigateByUrl('cadastro/operadores/editar/' + this.operadorId);
          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
        } else {
        // this.snackBar.success('Adição realizada com sucesso!', 3500, 'X');
        // this.service.create(body).toPromise()
        this.service.create(body)
        .subscribe(res => {
          this.snackBar.success('Cadastro realizado com sucesso!', 3500, 'X');
          this.router.navigateByUrl('cadastro/operadores/editar/' + this.operadorId);
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        });
        // this.router.navigateByUrl('cadastro/operadores/editar/' + this.operadorId);
      }
    }else{
      this.snackBar.error('formulário inválido!', 3500, 'X');
    }
  }
}
