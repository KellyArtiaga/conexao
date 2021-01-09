import { CidadeModel } from './cidade-model';
import { BaseModel } from './base-model';

export interface TenantModel extends BaseModel {
    id: number;
    active?: boolean;
    name?: string;
    companyCode?: string;
}
