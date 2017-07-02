import { Component, OnInit } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IContact } from '../model/contact';
import { DBOperation } from '../shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { MdDialog, MdDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
@Component({
    templateUrl: 'app/components/managecontact.component.html',
})
export class ManageContact implements OnInit {
    msg: string;
    indLoading: boolean = false;
    contactFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
    listFilter: string;
    selectedOption: string;
    contact: IContact;
    genders = [
        'Male',
        'Female'
    ];
    technologies = ['Javscript', 'SharePoint', 'DotNet'];
    
    constructor(private fb: FormBuilder, private _contactService: ContactService, public dialogRef: MdDialogRef<ManageContact>) { }
    
    ngOnInit(): void {
        this.contactFrm = this.fb.group({
            id: [''],
            name: ['', [Validators.required, Validators.maxLength(50)]],
            email: ['', [Validators.required, Validators.email]],
            gender: ['', Validators.required],
            birth: ['', Validators.required],
            techno: [''],
            message: ['', Validators.required]
        });
    
        this.contactFrm.valueChanges.subscribe(data => this.onValueChanged(data));
        this.onValueChanged();
        if (this.dbops == DBOperation.create)
            this.contactFrm.reset();
        else
            this.contactFrm.setValue(this.contact);
        this.SetControlsState(this.dbops == DBOperation.delete ? false : true);
    }
    onValueChanged(data?: any) {
        if (!this.contactFrm) { return; }
        const form = this.contactFrm;
        for (const field in this.formErrors) {
            // clear previous error message (if any)
            this.formErrors[field] = '';
            const control = form.get(field);
            if (control && control.dirty && !control.valid) {
                const messages = this.validationMessages[field];
                for (const key in control.errors) {
                    this.formErrors[field] += messages[key] + ' ';
                }
            }
        }
    }
    formErrors = {
        'name': '',
        'email': '',
        'gender': '',
        'birth': '',
        'techno': '',
        'message': ''
    };
    validationMessages = {
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
        }
        ,
        'birth': {
            'required': 'DOB is required.'
        }
        ,
        'message': {
            'required': 'message is required.'
        }
        
    };
    onSubmit(formData: any) {
        switch (this.dbops) {
            case DBOperation.create:
                this._contactService.post(Global.BASE_USER_ENDPOINT, formData.value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.update:
                this._contactService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
            case DBOperation.delete:
                this._contactService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id).subscribe(
                    data => {
                        if (data == 1) //Success
                        {
                            this.dialogRef.close("success");
                        }
                        else {
                            this.dialogRef.close("error");
                        }
                    },
                    error => {
                        this.dialogRef.close("error");
                    }
                );
                break;
        }
    }
    SetControlsState(isEnable: boolean) {
        isEnable ? this.contactFrm.enable() : this.contactFrm.disable();
    }
}