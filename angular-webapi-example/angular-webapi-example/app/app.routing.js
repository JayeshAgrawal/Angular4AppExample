"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var contact_component_1 = require("./components/contact.component");
var appRoutes = [
    { path: '', redirectTo: 'contact', pathMatch: 'full' },
    { path: 'contact', component: contact_component_1.ContactComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map