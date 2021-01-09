import { Directive, HostListener, Output, EventEmitter, ElementRef} from '@angular/core'
import { CepService } from '../services/cep.service';
import { SnackBarService } from '../services/snack-bar.service';

@Directive({
  selector: "input[appCep]"
})
export class CepDirective {

  @Output() onCepFound = new EventEmitter();

  private el
  constructor(element: ElementRef, private service: CepService, private snackBar: SnackBarService) {
    this.el = element;
  }


  @HostListener("change") onChange(e) {
    var cepNumber = this.el.nativeElement.value.replace(/[^0-9]/g, '');
    if (cepNumber.toString().length >= 8) {
      this.service.getCep(cepNumber)
      .subscribe(result => this.onCepFound.emit(result.data),
      err => {
        this.snackBar.error(err, 3000, 'X');
      })
    }
  }
}
