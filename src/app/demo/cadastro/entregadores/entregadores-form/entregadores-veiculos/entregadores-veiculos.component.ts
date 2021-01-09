import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { VeiculosService } from '../../../../services/veiculos.service';
import { EntregadoresService } from '../../../../services/entregadores.service';
import { UserAcessAuth } from '../../../../services/user-access.service';
import { MatTableDataSource } from '@angular/material/table';
import { OperadorModel } from '../../../../models/operador-model';
import { MatSort } from '@angular/material/sort';
import { SnackBarService } from '../../../../services/snack-bar.service';
import { MatDialog } from '@angular/material/dialog';
import { ModalConfirmationComponent } from 'src/app/theme/shared/components/modal-confirmation/modal-confirmation.component';
import { AuthGuardService } from '../../../../../../guards/auth.guard';

@Component({
  selector: 'app-entregadores-veiculos',
  templateUrl: './entregadores-veiculos.component.html',
  styleUrls: ['./entregadores-veiculos.component.scss']
})
export class EntregadoresVeiculosComponent implements OnInit {
  dataSource;
  noResult: boolean = false;
  displayedColumns = [
    'marca',
    'modelo',
    "cor",
    "ano",
    "placa",
    "tipo",
    'buttons'
  ]

  entregadoresId = null
  vehicles = []
  selectedCard = null
  editingData = null

  @Output() onChange = new EventEmitter();

  public possibleVehicles = [

  ]

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private veiculosService: VeiculosService,
    private service: EntregadoresService,
    private snackBar: SnackBarService,
    private dialog: MatDialog,
    public auth: AuthGuardService

  ) { }

  ngOnInit(): void {
    this.entregadoresId = this.route.snapshot.paramMap.get('id');
    this.getData();
    this.getTypes();
  }

  getData() {
    this.veiculosService.getByEntregadorId(this.entregadoresId)
    .subscribe(res => {
      this.vehicles = res.data.map((item, idx) => {return {id: item.tipo, nome: item.tipo, data: item}})
      this.onChange.emit(this.vehicles)
      console.log('RAW DATA', this.vehicles)
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })


    // this.modulosService.getOperatorsServices(this.entregadoresId)
    // .subscribe(result => {
    //   this.dataSource = new MatTableDataSource(result.data);
    // })
  }

  getTypes() {
    this.veiculosService.getTypes(this.entregadoresId)
    .subscribe(res => {
      this.possibleVehicles = res.data.map((item, idx) => {return {id: item, nome: item, data: {tipo: item}}})
      console.log(this.possibleVehicles)
    }, err => {
      this.snackBar.error(err, 3500, 'X');
    })
  }
  
  edit(row) {}

  confirmDelete(row) {
    
    const dialogRef = this.dialog.open(ModalConfirmationComponent, {
      data: {
        message: 'Você deseja realmente excluir este veículo?',
        buttonText: {
          ok: 'Sim',
          cancel: 'Não'
        }
      }
    });
    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.service.delete(row.id)
        .subscribe(res => {
          this.snackBar.success("Veículo excluído com sucesso!", 3500, 'X');
          this.getData();
        }, err => {
          this.snackBar.error(err, 3500, 'X');
        })
      }
    });
  }

  onSelectCard(e: any): void {
    console.log("setting editing data", e)
    this.editingData = e;
    console.log(this.editingData)
  }

  onRemoveCard(e: any): void {
    console.log("remove", e)
    
    if (e.data && e.data.id) {
      
      this.veiculosService.delete(e.data.id)
      .subscribe(res => {
        
        this.snackBar.success("Veículo excluído com sucesso!", 3500, 'X');
      }, err => {
        this.snackBar.error(err, 3500, 'X');
      })
    }
    console.log(this.editingData)
  }

  onDataChange(e: any): void {
    //this.vehicles = e;
    var index = this.vehicles.findIndex(v => v.id === e.id);
    console.log(index, e, this.vehicles)
    this.vehicles[index] = e
    console.log("changed", e)
  }
}
