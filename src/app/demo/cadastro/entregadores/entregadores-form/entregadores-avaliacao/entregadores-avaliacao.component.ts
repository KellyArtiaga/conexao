import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidateBrService } from 'angular-validate-br';
import { SnackBarService } from 'src/app/demo/services/snack-bar.service';
import { AuthGuardService } from 'src/guards/auth.guard';
import * as moment from "moment";
import { EntregadoresService } from 'src/app/demo/services/entregadores.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-entregadores-avaliacao',
  templateUrl: './entregadores-avaliacao.component.html',
  styleUrls: ['./entregadores-avaliacao.component.scss']
})
export class EntregadoresAvaliacaoComponent implements OnInit {

  public form = new FormGroup({
    descricao: new FormControl(''),
    avaliation: new FormControl(0)
  })



  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private service: EntregadoresService,
    private snackBar: SnackBarService,
    private router: Router,
    private dialog: MatDialog,
    private validateBrService: ValidateBrService,
    public auth: AuthGuardService,
) { }

  ngOnInit(): void {

  }


  public changeAvaliation(to: number): void {
    this.form.get('avaliation').setValue(to);
  }

  public onSubmit(e, form): void {
    
  }
}
