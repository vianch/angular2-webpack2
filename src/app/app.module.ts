import { NgModule } from "@angular/core";

import { AppComponent } from "./app.component";
import { CoreModule } from "./core/";
import { SharedModule } from "./shared/";

@NgModule({
    imports: [
        CoreModule,
        SharedModule
    ],
    declarations: [
        AppComponent,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {
}