import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class FiltrosStorageService {
    private filtros: any;

    constructor() { }

    get filtro(): any {
        return this.filtros;
    }

    set filtro(filtro: any) {
        this.filtros = filtro;
    }
}
