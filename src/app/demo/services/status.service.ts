import { Injectable } from "@angular/core";

@Injectable({
    providedIn: "root"
})
export class StatusService {
    constructor() {}

    public listStatus(): any[] {
        let statusList = [
            { id: 0, description: "Inativo" },
            { id: 1, description: "Ativo" }
        ];

        return statusList;
    }
}
