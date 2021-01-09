import { BaseModel } from './base-model';


export interface OperadorModel extends BaseModel {
  id: number,
  codigo: string,
  cnpj: string,
  email: string,
  nomeContato: String,
  telefoneContato: string,
  logradouro: string,
  numero: string,
  complemento: string,
  referencia: string,
  bairro: string,
  cep: string,
  cidade: string,
  uf: string,

  urlContrato: string,
  urlFotoPerfil: string,
  razaoSocial: string,
  inscricaoMunicipal: string,
  active: boolean,
  tenant: any[],
  responsavelNome: string,
  responsavelCpf: string,
  responsavelEmail: string,

  celular: string,
  cpf: string,
  dataFimVigenciaContrato: string,
  dataInicioVigenciaContrato: string,
  diaEnvioFaturamento: 0,
  diaInicioFaturamento: 0,
  idContratante: 0,
  nome: string
}
