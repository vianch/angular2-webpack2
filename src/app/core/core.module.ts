import { NgModule } from "@angular/core";
import { HttpModule } from "@angular/http";
import { BrowserModule } from "@angular/platform-browser";
import {RouterModule} from "@angular/router";

@NgModule({
    imports: [
        BrowserModule,
        HttpModule,
        RouterModule
    ],
    exports: [
        BrowserModule,
        HttpModule,
        RouterModule,
    ],
    declarations: [],
    providers: [],
})
export class CoreModule { }