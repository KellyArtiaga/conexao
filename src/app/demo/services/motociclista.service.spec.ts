import { TestBed } from "@angular/core/testing";
import { MotociclistaService } from "./motociclista.service";

describe("CompraService", () => {
    beforeEach(() => TestBed.configureTestingModule({}));

    it("should be created", () => {
        const service: MotociclistaService = TestBed.get(MotociclistaService);
        expect(service).toBeTruthy();
    });
});
