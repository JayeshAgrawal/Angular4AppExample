"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contact_service_1 = require("./service/contact.service");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var animations_1 = require("@angular/platform-browser/animations");
var material_1 = require("@angular/material");
var app_component_1 = require("./app.component");
var app_routing_1 = require("./app.routing");
var contact_component_1 = require("./components/contact.component");
var managecontact_component_1 = require("./components/managecontact.component");
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule,
                material_1.MaterialModule,
                material_1.MdNativeDateModule,
                animations_1.BrowserAnimationsModule, animations_1.NoopAnimationsModule,
                app_routing_1.routing],
            declarations: [app_component_1.AppComponent, contact_component_1.ContactComponent, managecontact_component_1.ManageContact],
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, contact_service_1.ContactService],
            entryComponents: [managecontact_component_1.ManageContact],
            bootstrap: [app_component_1.AppComponent]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map