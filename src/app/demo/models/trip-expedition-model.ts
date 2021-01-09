export interface TripModel {
    id: number;
    idExternal: number;
    order_position?: number;
    selected?: boolean;
    checked?: boolean;
    date?: Date;
    prazo?: Date;
    endereco: string;
    qt?: number;
    latitude: number;
    longitude: number
}