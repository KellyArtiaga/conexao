import { EstadoModel } from "./estado-model";

export interface CidadeModel {
    estado: EstadoModel;
    id: number;
    nome: string;
}
