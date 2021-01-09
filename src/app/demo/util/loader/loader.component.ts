import { Component, OnInit } from "@angular/core";
import { LoaderService } from "../../main/services/loader.service";
import { Subscription } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: "app-loader",
    templateUrl: "./loader.component.html",
    styleUrls: ["./loader.component.scss"]
})
export class LoaderComponent implements OnInit {
    loading: boolean;
    subscription: Subscription;
    constructor(private loaderService: LoaderService) {}
    ngOnInit() {
        this.subscription = this.loaderService.isLoading
            .pipe(debounceTime(200))
            .subscribe((value: boolean) => {
                this.loading = value;
            });
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
