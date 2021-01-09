import { CidadeModel } from "./cidade-model";
import { BaseModel } from "./base-model";

export interface ClienteModel extends BaseModel {
    id: number;
    nome: string;
    cnpj: string;
    endereco: string;
    numeroEndereco: string;
    bairro: string;
    cidade: CidadeModel;
    estado: string;
    cep: string;
    telefone: string;
    nomeContato: string;
    email: string;
    status: any;
    nomeCliente: any;
    ativo: boolean;
}
