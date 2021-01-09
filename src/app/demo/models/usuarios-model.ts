import { TenantModel } from 'src/app/demo/models/tenant-model';
import { CidadeModel } from './cidade-model';
import { BaseModel } from './base-model';

export interface UsuariosModel extends BaseModel {
    id: number;
    active: boolean;
    login: string;
    name: string;
    roles: string[];
    tenant: TenantModel;
    companyRegistry:string,
    // razaoSocial: string;
    // cnpj: string;
    // inscricaoEstadual: string;
    // email: string;
    // nomeContato: string;
    // telefoneContato: number;
    // logradouro: string;
    // numero: string;
    // complemento: string;
    // referencia: string;
    // bairro: string;
    // cep: string;
    // cidade: CidadeModel;
    // uf: string;
    // dataInicioVigenciaContrato: Date;
    // dataFimVigenciaContrato: Date;
    // dataInicioFaturamento: Date;
    // dataFimFaturamento: Date;
    // ativo: boolean;
}
