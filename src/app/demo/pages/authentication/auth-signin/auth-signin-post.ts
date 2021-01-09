import { TenantModel } from 'src/app/demo/models/tenant-model';

export interface AuthSigninPOST {
  id?: number;
  login?: string;
  password?: any;
  name?: string;
  roles?: string[];
  active?: boolean;
  tenant?: TenantModel;
  companyRegistry?: string
  /*   project: string;
    grant_type?: string;
    auth?: string; */
}
