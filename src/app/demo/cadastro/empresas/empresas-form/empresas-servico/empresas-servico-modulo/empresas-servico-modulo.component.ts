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
import { EmpresaService } from 'src/app/demo/services/empresa.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-empresas-servico-modulo',
  templateUrl: './empresas-servico-modulo.component.html',
  styleUrls: ['./empresas-servico-modulo.component.scss']
})
export class EmpresasServicoModuloComponent implements OnInit {
  @Pipe({ name: 'reverse' })

  form: FormGroup;
  formPrecificacao: FormGroup;
  isSubmit: boolean;
  isUserAdmin: boolean;
  isAdminRole: boolean;
  operadorId = null;
  empresaId = null;

  isFixoMensal:boolean;
  tipoModulos: Object[] = [];
  tipoContrato: Object[] = [];
  tipoPrecificacao: Object[] = [];
  tipoHora: Object[] = [];
  tipoPrimeiraEntrega: Object[] = [];

  isDelete: boolean;
  invalidFaixa: any;
  faixasNoDeleted: [];

  isLastFaixa:boolean;
  isValid: boolean;
  noFaixa=false;
  bigmodal = false;

  precificacoes: any = []
  selectedPrecificacao: number = -1;
  lojas: any[] = [];
  lojasEdicao: any[] = [];
  lojasSelecionadas: any[] = [];
  dadosPrecificacoes: any[] = [];
  empresasEdit: any[] = [];

  isAllSelected = false;
  tenant: any;
  matriz_id: any;
  servico_id: any;
  operador_id: any;
  tenant_Id: string;
  hasServico:boolean;
  status: boolean;
  dataSource: any;
  isEdition: boolean;
  novoArrayEmpresa: any[];

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: ModulosService,
    private empresaService: EmpresaService,
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
    this.empresaId = this.route.snapshot.paramMap.get('empresaId');
    this.tenant_Id = localStorage.getItem('tenant');
    this.servico_id = localStorage.getItem('servicoId');
    this.createForm();
    this.getSelectValues();
    this.getData();
  }

  createForm() {
    this.form = this.formBuilder.group({
      id: [this.route.snapshot.paramMap.get('id') || null],
      modulo: ['', Validators.required],
      tipoRemuneracao: ['', Validators.required],
      tipoContrato: ['', Validators.required],
      Precificacao: [null]
    });

    // Dados Precificacao
    this.formPrecificacao = this.formBuilder.group({
      id:[''],
      servicoEmpresa:[parseInt(this.servico_id)],
      empresas:[''],
      active:[this.status],
      cobrarColeta:[''],
      valorColeta:[''],
      cobrarEntregasSeguintes:[''],
      valorEntregasSeguintes:[''],
      tipoCobrancaEntregaHora:[''],
      cobrarHora:[''],
      valorHora:[''],
      tipoCobrancaPrimeiraEntrega:[''],
      cobrarPrimeiraEntrega:[''],
      valorPrimeiraEntrega:[''],
      cobrarRetorno:[''],
      valorRetorno:[''],
      qtdMinimaExpedicao:[''],
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
    } else{
    this.service.getByIdServico(this.servico_id)
    .subscribe(result => {
      console.log('result_getByIdServico')
      console.log( result.data)
        var data = result.data
        this.form.get('modulo').setValue(data.servico || "");
        this.form.get('tipoRemuneracao').setValue(data.remuneracao || "")
        this.form.get('tipoContrato').setValue(data.tipo || "");

        this.status = data.active;
        this.matriz_id = data.matriz.id;
        this.dadosPrecificacoes = data.precificacao;
        this.operador_id = this.tenant_Id;
        this.hasServico = true;
        this.getSelectValues(data.matriz.id);
    });
    }
  }

  getSelectValues( matriz_id? :any) {
    const matriz = parseInt(matriz_id);
    this.service.getEmpresasModulos(this.tenant_Id)
    .subscribe(result => {
      result.data.map(r => {
        this.tipoModulos.push({label: r, value: r})
      })
    });

    this.service.getTiposContrato()
    .subscribe(result => {
      result.data.map(r => {
        this.tipoContrato.push({label: r.replace("_", " "), value: r})
      })
    });

    this.service.getTiposPrecificacao()
    .subscribe(result => {
    if(result){
      result.data.map(r => {
        this.tipoPrecificacao.push({label: r.replace("_", " "), value: r})
      })
    }});

    if(matriz_id){
      this.getLojas(matriz_id);

      this.service.getTipoHora()
        .subscribe(result => {
          result.data.map(r => {
              this.tipoHora.push({label: r, value: r})
          })
      });

      this.service.getTipoPrimeiraEntrega()
        .subscribe(result => {
        result.data.map(r => {
            this.tipoPrimeiraEntrega.push({label: r, value: r})
          })
        });
    }
  }

  getLojas(matriz?, item?){
    // Se for edição
    if(item){
    this.lojas = [];
      this.service.getLojasPrecificacao(matriz, this.servico_id)
        .subscribe(result => {
        if(result.data){
          result.data.map( r => {
            this.lojas.push(r);
        })}
        item.map((r, index) => {
         if(r){
          this.lojas.push(r);
          this.switchLoja(index,'', true);
          }
        })
      });

    // Se não for edição
    }else{
    this.lojas = [];
    this.service.getLojasPrecificacao(matriz, this.servico_id)
      .subscribe(result => {
      result.data.map(r => {
          this.lojas.push(r);
      })
    });
    }
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

    if(event.value === 'FIXO_MENSAL' || this.form.value.faixasPreco === 'FIXO_MENSAL' || event === 'FIXO_MENSAL'){
    if(!isEdit && faixas){
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

  compareFn( optionOne, optionTwo ) : boolean {
    return optionOne.id === optionTwo.id;
  }

  openBigModal(e, item? , index?: number) {
      this.bigmodal = true;

      this.precificacoes.push({
        id: "",
        tipoPrecificacao: "",
        tipoContrato: "",
        valor: 0,
        quantidadeLojas: 0,
        lojas: []
      })
      index = this.precificacoes.length - 1;

      if(item != '' && index != -1){
      this.isEdition = true;
      this.service.getServicoSalvo(item.id)
      .subscribe( response => {
      const r = response.data;
        this.formPrecificacao.get('id').setValue(r.id? r.id : '');
        this.formPrecificacao.get('cobrarColeta').setValue(r.cobrarColeta ? r.cobrarColeta : '');
        this.formPrecificacao.get('valorColeta').setValue(r.valorColeta ? this.pricePipe.transform(r.valorColeta, 2) : '');
        this.formPrecificacao.get('cobrarEntregasSeguintes').setValue(r.cobrarEntregasSeguintes ? r.cobrarEntregasSeguintes : '');
        this.formPrecificacao.get('valorEntregasSeguintes').setValue(r.valorEntregasSeguintes ? this.pricePipe.transform(r.valorEntregasSeguintes, 2) : '');
        this.formPrecificacao.get('tipoCobrancaEntregaHora').setValue(r.tipoCobrancaEntregaHora?r.tipoCobrancaEntregaHora : '');
        this.formPrecificacao.get('cobrarHora').setValue(r.cobrarHora ? r.cobrarHora : '');
        this.formPrecificacao.get('valorHora').setValue(r.valorHora ? this.pricePipe.transform(r.valorHora, 2) : '');
        this.formPrecificacao.get('tipoCobrancaPrimeiraEntrega').setValue(r.tipoCobrancaPrimeiraEntrega ? r.tipoCobrancaPrimeiraEntrega : '');
        this.formPrecificacao.get('cobrarPrimeiraEntrega').setValue(r.cobrarPrimeiraEntrega ? r.cobrarPrimeiraEntrega : '');
        this.formPrecificacao.get('valorPrimeiraEntrega').setValue(r.valorPrimeiraEntrega ? this.pricePipe.transform(r.valorPrimeiraEntrega, 2) : '');
        this.formPrecificacao.get('cobrarRetorno').setValue(r.cobrarRetorno ? r.cobrarRetorno : '');
        this.formPrecificacao.get('valorRetorno').setValue(r.valorRetorno ? this.pricePipe.transform(r.valorRetorno, 2) : '');
        this.formPrecificacao.get('qtdMinimaExpedicao').setValue(r.qtdMinimaExpedicao ? r.qtdMinimaExpedicao : '');
        this.getLojas(this.matriz_id, r.empresas)
      }, err => {
        this.snackBar.error(err, 3000, 'X');
      });
    }else{
      this.isEdition = false;
    }
    this.selectedPrecificacao = index;
  }

  remove(e, index: number, item){
    if(e){
      this.service.deletePrecificacaoEmpresas(item.id)
      .subscribe( response => {
        this.precificacoes.splice(index, 1);
        this.precificacoes = new MatTableDataSource(this.precificacoes);
        location.reload();
      }, err => {
        this.snackBar.error(err, 3000, 'X');
      });
    }
  }

  closeBigModal(e) {
      if(e === true){
        this.bigmodal = false;
        this.router.navigateByUrl('cadastro/empresas/editar/' + this.empresaId + '/modulos/editar/' + this.servico_id);
      }else{
        this.bigmodal = false;
        if(this.isEdition){
          this.formPrecificacao.get('cobrarColeta').setValue('');
          this.formPrecificacao.get('valorColeta').setValue('');
          this.formPrecificacao.get('cobrarEntregasSeguintes').setValue('');
          this.formPrecificacao.get('valorEntregasSeguintes').setValue('');
          this.formPrecificacao.get('tipoCobrancaEntregaHora').setValue('');
          this.formPrecificacao.get('cobrarHora').setValue('');
          this.formPrecificacao.get('valorHora').setValue('');
          this.formPrecificacao.get('tipoCobrancaPrimeiraEntrega').setValue('');
          this.formPrecificacao.get('cobrarPrimeiraEntrega').setValue('');
          this.formPrecificacao.get('valorPrimeiraEntrega').setValue('');
          this.formPrecificacao.get('cobrarRetorno').setValue('');
          this.formPrecificacao.get('valorRetorno').setValue('');
          this.formPrecificacao.get('qtdMinimaExpedicao').setValue('');

          this.getLojas(this.matriz_id)
        }
      }
    }

  changePrecificacaoFieldValue(field, value) {
    this.precificacoes[this.selectedPrecificacao][field] = value;
  }

  changePrecificacaoField(field: string, value: string) {
    this.precificacoes[this.selectedPrecificacao][field] = value;
  }

  getPrecificacaoValue(field: string) {
    if (Array.isArray(this.precificacoes[this.selectedPrecificacao][field])) {
      return this.precificacoes[this.selectedPrecificacao][field].filter(r => r);
    }
    return this.precificacoes[this.selectedPrecificacao][field];
  }

  isLojaSelected(id: number) {
    return this.precificacoes[this.selectedPrecificacao].lojas.find(l => l && l.id  === id) ? true : false
  }

  checkFuntion(){
  return true}

  switchLoja(index: number, event?, boolean?:boolean ) {
    if (event.checked) {
      this.precificacoes[this.selectedPrecificacao].lojas[index] = this.lojas[index];
      this.precificacoes[this.selectedPrecificacao].lojas[index].checked = true
    }else if(boolean){
      this.precificacoes[this.selectedPrecificacao].lojas[index] = this.lojas[index];
      this.precificacoes[this.selectedPrecificacao].lojas[index].checked = true
    } else {
      this.isAllSelected = false;
      this.precificacoes[this.selectedPrecificacao].lojas[index].checked = false;
      this.precificacoes[this.selectedPrecificacao].lojas[index] = null;
    }
  }

   changeLojaFieldValue(field, value) {
    this.lojasSelecionadas = [];
    var index = this.precificacoes[this.selectedPrecificacao].lojas.findIndex(l => l);
    this.precificacoes[this.selectedPrecificacao].lojas[index][field] = value;
    console.log('this.precificacoes4')
    console.log(this.precificacoes);
    this.precificacoes[this.selectedPrecificacao].lojas.map((char) => {
      this.lojasSelecionadas.push(char)
    })
  }

  selectAll(event) {
    this.lojas.forEach((loja, index) => {
      this.switchLoja(index,'', true);
    })
    this.isAllSelected = event.checked;
  }

  save(form:any) {
    var v = this.form.value;
    if(form.valid){
      var body = {
        id: v.id,
        tipo: v.tipoContrato,
        remuneracao:v.tipoRemuneracao,
        servico: {id:  v.modulo.id},
        matriz:{id: parseInt(this.empresaId)},
      }
     if (this.servico_id != '' || body.id != null) {
        body['id'] = v.id
        body['operador'] = {id: this.empresaId}

        this.service.putEmpresa(body)
          .subscribe(res => {
            this.router.navigateByUrl('cadastro/empresas/editar/' + this.empresaId);
            this.snackBar.success('Atualizado com sucesso!', 3500, 'X');

          }, err => {
            this.snackBar.error(err, 3500, 'X');
          });
        } else {
        this.service.createServicoEmpresa(body)
        .subscribe(res => {
          location.reload();
          this.snackBar.success('Cadastro realizado com sucesso!', 3500, 'X');
          location.reload();

          this.hasServico = true
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        });
      }
    }else{
      this.snackBar.error('formulário inválido!', 3500, 'X');
   	}
  }

  saveModal(e) {
    const value = e.target.value;

    this.formPrecificacao.value.active = this.status;
      if(this.precificacoes[this.selectedPrecificacao]){
      console.log('this.precificacoes[this.selectedPrecificacao]')
      console.log(this.precificacoes[this.selectedPrecificacao])
        this.formPrecificacao.value.empresas =
          this.precificacoes[this.selectedPrecificacao].lojas.filter((e, index) => {
          if(e != null){
            return {id: e.id}
          }
        })
      }

      // Removendo campos vazios em empresas
      const empresas = this.formPrecificacao.value.empresas

      this.novoArrayEmpresa = [];
      empresas.forEach(element => {
        if(element != null || element != ''){
        this.novoArrayEmpresa.push(element)
        }
      });

    var v = this.formPrecificacao.value;
    var body2 = {
      id: v.id,
      servicoEmpresa: {id: v.servicoEmpresa},
      empresas: v.empresas? this.novoArrayEmpresa : '',
      active: v.active,
      cobrarColeta: v.cobrarColeta ? v.cobrarColeta : '',
      valorColeta: v.valorColeta ? this.onlyNumbers (this.toPrice(v.valorColeta, 2), true) : "",
      cobrarEntregasSeguintes: v.cobrarEntregasSeguintes ? v.cobrarEntregasSeguintes : '',
      valorEntregasSeguintes: v.valorEntregasSeguintes ? this.onlyNumbers (this.toPrice(v.valorEntregasSeguintes, 2), true) : "",
      tipoCobrancaEntregaHora:  v.tipoCobrancaEntregaHora ? v.tipoCobrancaEntregaHora : 'FIXO',
      cobrarHora: v.cobrarHora ? v.cobrarHora : '',
      valorHora:  v.valorHora ? this.onlyNumbers (this.toPrice(v.valorHora, 2), true) : "",
      tipoCobrancaPrimeiraEntrega:  v.tipoCobrancaPrimeiraEntrega ? v.tipoCobrancaPrimeiraEntrega : 'FIXO' ,
      cobrarPrimeiraEntrega: v.cobrarPrimeiraEntrega ? v.cobrarPrimeiraEntrega : '',
      valorPrimeiraEntrega: v.valorPrimeiraEntrega ? this.onlyNumbers (this.toPrice(v.valorPrimeiraEntrega, 2), true) : "",
      cobrarRetorno: v.cobrarRetorno ? v.cobrarRetorno : '',
      valorRetorno: v.valorRetorno ? this.onlyNumbers (this.toPrice(v.valorRetorno, 2), true) : "",
      qtdMinimaExpedicao: v.qtdMinimaExpedicao ? v.qtdMinimaExpedicao : '',
    }

    console.log('body2.id')
    console.log(body2.id)
    /* if(this.precificacoes[this.selectedPrecificacao].lojas != null){
      if(this.isEdition || body2.id != null){
        this.service.putPrecificacao(body2)
          .subscribe(res => {
            this.snackBar.success('Cadastro realizado com sucesso!', 3500, 'X');
            this.closeBigModal(false);
            this.router.navigateByUrl('cadastro/empresas/editar/' + this.empresaId + '/modulos/editar/' + this.servico_id);
            location.reload();
            this.hasServico = true;
          }, err => {
            this.snackBar.error('Erro encontrado, Tente novamente!', 3500, 'X');
          });
      }else{
        this.service.postPrecificacao(body2)
          .subscribe(res => {
            this.snackBar.success('Cadastro realizado com sucesso!', 3500, 'X');
            this.closeBigModal(false);
            location.reload();
            this.router.navigateByUrl('cadastro/empresas/editar/' + this.empresaId + '/modulos/editar/' + this.servico_id);
            this.hasServico = true;
          }, err => {
            this.snackBar.error('Erro encontrado, Tente novamente!', 3500, 'X');
          });
      }
    }else{
      this.snackBar.error('Campo de unidades obrigatório!', 3500, 'X');
    } */
  }
}

