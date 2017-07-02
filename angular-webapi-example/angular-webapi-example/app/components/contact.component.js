"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var contact_service_1 = require("../service/contact.service");
var material_1 = require("@angular/material");
var enum_1 = require("../shared/enum");
var global_1 = require("../shared/global");
var managecontact_component_1 = require("./managecontact.component");
var ContactComponent = (function () {
    function ContactComponent(_contactService, dialog) {
        this._contactService = _contactService;
        this.dialog = dialog;
        this.indLoading = false;
    }
    ContactComponent.prototype.openDialog = function () {
        var _this = this;
        var dialogRef = this.dialog.open(managecontact_component_1.ManageContact);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.contact = this.contact;
        dialogRef.afterClosed().subscribe(function (result) {
            if (result == "success") {
                _this.LoadContacts();
                switch (_this.dbops) {
                    case enum_1.DBOperation.create:
                        _this.msg = "Data successfully added.";
                        break;
                    case enum_1.DBOperation.update:
                        _this.msg = "Data successfully updated.";
                        break;
                    case enum_1.DBOperation.delete:
                        _this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                _this.msg = "There is some issue in saving records, please contact to system administrator!";
            else
                _this.msg = result;
        });
    };
    ContactComponent.prototype.ngOnInit = function () {
        this.LoadContacts();
    };
    ContactComponent.prototype.LoadContacts = function () {
        var _this = this;
        this._contactService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (contacts) { _this.contacts = contacts; }
        //,error => this.msg = <any>error
        );
    };
    ContactComponent.prototype.addContact = function () {
        this.dbops = enum_1.DBOperation.create;
        this.modalTitle = "Add New Contact";
        this.modalBtnTitle = "Add";
        this.openDialog();
    };
    ContactComponent.prototype.editContact = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.modalTitle = "Edit Contact";
        this.modalBtnTitle = "Update";
        this.contact = this.contacts.filter(function (x) { return x.id == id; })[0];
        this.openDialog();
    };
    ContactComponent.prototype.deleteContact = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.contact = this.contacts.filter(function (x) { return x.id == id; })[0];
        this.openDialog();
    };
    ContactComponent = __decorate([
        core_1.Component({
            templateUrl: 'app/components/contact.component.html'
        }),
        __metadata("design:paramtypes", [contact_service_1.ContactService, material_1.MdDialog])
    ], ContactComponent);
    return ContactComponent;
}());
exports.ContactComponent = ContactComponent;
//# sourceMappingURL=contact.component.js.map