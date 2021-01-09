import { BaseModel } from "./base-model";

export interface EntregaModel extends BaseModel {
    id: number;
    nome?: string;
    nomeCliente?: any;
    nomeMotociclista: string;
    idExternalTrip: string;
    dataRecebimento: string;
    dataInicio: string;
    dataFim: string;
    tempoTotalDaTrip: string;
    numeroColeta: string;
    numeroEntregas: string;
    statusTrip: string;
    descricaoProblema: string;
    idTrip: any;
}
