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
var forms_1 = require("@angular/forms");
var enum_1 = require("../shared/enum");
var global_1 = require("../shared/global");
var material_1 = require("@angular/material");
var ManageContact = (function () {
    function ManageContact(fb, _contactService, dialogRef) {
        this.fb = fb;
        this._contactService = _contactService;
        this.dialogRef = dialogRef;
        this.indLoading = false;
        this.genders = [
            'Male',
            'Female'
        ];
        this.technologies = ['Javscript', 'SharePoint', 'DotNet'];
        this.formErrors = {
            'name': '',
            'email': '',
            'gender': '',
            'birth': '',
            'techno': '',
            'message': ''
        };
        this.validationMessages = {
            'name': {
                'maxlength': 'Name cannot be more than 50 characters long.',
                'required': 'Name is required.'
            },
            'email': {
                'email': 'Invalid email format.',
                'required': 'Email is required.'
            },
            'gender': {
                'required': 'Gender is required.'
            },
            'birth': {
                'required': 'DOB is required.'
            },
            'message': {
                'required': 'message is required.'
            }
        };
    }
    ManageContact.prototype.ngOnInit = function () {
        var _this = this;
        this.contactFrm = this.fb.group({
            id: [''],
            name: ['', [forms_1.Validators.required, forms_1.Validators.maxLength(50)]],
            email: ['', [forms_1.Validators.required, forms_1.Validators.email]],
            gender: ['', forms_1.Validators.required],
            birth: ['', forms_1.Validators.required],
            techno: [''],
            message: ['', forms_1.Validators.required]
        });
        this.contactFrm.valueChanges.subscribe(function (data) { return _this.onValueChanged(data); });
        this.onValueChanged();
        if (this.dbops == enum_1.DBOperation.create)
            this.contactFrm.reset();
        else
            this.contactFrm.setValue(this.contact);
        this.SetControlsState(this.dbops == enum_1.DBOperation.delete ? false : true);
    };
    ManageContact.prototype.onValueChanged = function (data) {
        if (!this.contactFrm) {
            return;
        }
        var form = this.contactFrm;
        for (var field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            var control = form.get(field);
            if (control && control.dirty && !control.valid) {
                var messages = this.validationMessages[field];
                for (var key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    };
    ManageContact.prototype.onSubmit = function (formData) {
        var _this = this;
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._contactService.post(global_1.Global.BASE_USER_ENDPOINT, formData.value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.update:
                this._contactService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
            case enum_1.DBOperation.delete:
                this._contactService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.dialogRef.close("success");
                    }
                    else {
                        _this.dialogRef.close("error");
                    }
                }, function (error) {
                    _this.dialogRef.close("error");
                });
                break;
        }
    };
    ManageContact.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.contactFrm.enable() : this.contactFrm.disable();
    };
    ManageContact = __decorate([
        core_1.Component({
            templateUrl: 'app/components/managecontact.component.html',
        }),
        __metadata("design:paramtypes", [forms_1.FormBuilder, contact_service_1.ContactService, material_1.MdDialogRef])
    ], ManageContact);
    return ManageContact;
}());
exports.ManageContact = ManageContact;
//# sourceMappingURL=managecontact.component.js.map