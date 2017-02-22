import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { environment } from "../config/environment.config";
import { AppModule } from "./app/";

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule( AppModule );