import { CidadeModel } from "./cidade-model";
import { BaseModel } from "./base-model";

export interface EmpresaModel extends BaseModel {
    id: number;
    codigo: string;
    razaoSocial: string;
    cnpj: string;
    telefoneCentral: string;
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
    urlLogomarca: string;
    // horaFinalFuncionamento: Date;
    // horaInicialFuncionamento: Date;
}
