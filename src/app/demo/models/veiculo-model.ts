
import {Entregador} from './entregador-model';

export interface VeiculoModel {
  "active": boolean,
  "ano": string,
  "cooperado": Entregador,
  "cor": string,
  "deleted": boolean,
  "id": number,
  "marca": string,
  "modelo": string,
  "placa": string,
  "tenant": {
    "active": boolean,
    "cooperativeCode": string,
    "createdAt": string,
    "id": number,
    "lastUpdate": string,
    "name": string
  },
  "tipo": string
}
