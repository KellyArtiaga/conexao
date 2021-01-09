export interface BaseModel {
    id?: number;
    nome?: string;
    dataAlteracao?: Date;
    dataInsercao?: Date;
    usuarioAlteracao?: string;
    excluido?: boolean;
    ativo?: boolean;
}
