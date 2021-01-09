import { CidadeModel } from "./cidade-model";
import { BaseModel } from "./base-model";
import { BancoModel } from './banco-model';

export interface MotociclistaModel extends BaseModel {
    id: number;
    nome?: string;
    bairro: string;
    categoriaCnhEnum: string;
    celular: string;
    cep: string;
    cidade: CidadeModel;
    numeroCnh: string;
    cpf: string;
    dataAdesao: Date;
    dataExpiracaoLicenca: Date;
    dataNascimento: Date;
    dataExpiracaoCnh: Date;
    email: string;
    endereco: string;
    estadoCivil: string;
    nacionalidade: string;
    naturalidade: string;
    nomeConjuge: string;
    nomeMae: string;
    nomePai: string;
    numeroInscricaoInss: string;
    numeroLicenca: string;
    numeroMatricula: string;
    ativo: boolean;
    rg: string;
    telefone: string;
    veiculo: any;
    urlFotoMotociclista: string;
    urlFotoCnh: string;
    urlFotoLicenca: string;
    urlFotoInscricaoInss: string;
    urlFotoDocumentoVeiculo: string;
    aprovacaoMotociclista: string;
    banco: BancoModel,
    cpfTitular: string,
    nomeTitular: string,
    agencia: string,
    conta: string,
}
