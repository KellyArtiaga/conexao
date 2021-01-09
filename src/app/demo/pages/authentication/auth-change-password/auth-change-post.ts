import { TenantModel } from 'src/app/demo/models/tenant-model';

export interface AuthChangePOST {
  newPassword?: any;
  confirmPassword?: any;
  currentPassword?: any;
  token?: any;
  /*   project: string;
    grant_type?: string;
    auth?: string; */
}
