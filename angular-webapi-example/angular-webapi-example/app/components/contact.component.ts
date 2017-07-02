import { Component, OnInit, ViewChild } from '@angular/core';
import { ContactService } from '../service/contact.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MdDialog, MdDialogRef } from '@angular/material';

import { IContact } from '../model/contact';
import { DBOperation } from '../shared/enum';
import { Observable } from 'rxjs/Rx';
import { Global } from '../shared/global';
import { ManageContact } from './managecontact.component';

@Component({

    templateUrl: 'app/components/contact.component.html'

})

export class ContactComponent implements OnInit {
    contacts: IContact[];
    contact: IContact;
    msg: string;
    indLoading: boolean = false;
    contactFrm: FormGroup;
    dbops: DBOperation;
    modalTitle: string;
    modalBtnTitle: string;
 
    constructor(private _contactService: ContactService, private dialog: MdDialog) { }
    openDialog() {
        let dialogRef = this.dialog.open(ManageContact);
        dialogRef.componentInstance.dbops = this.dbops;
        dialogRef.componentInstance.modalTitle = this.modalTitle;
        dialogRef.componentInstance.modalBtnTitle = this.modalBtnTitle;
        dialogRef.componentInstance.contact = this.contact;
        dialogRef.afterClosed().subscribe(result => {
            if (result == "success") {
                this.LoadContacts();
                switch (this.dbops) {
                    case DBOperation.create:
                        this.msg = "Data successfully added.";
                        break;
                    case DBOperation.update:
                        this.msg = "Data successfully updated.";
                        break;
                    case DBOperation.delete:
                        this.msg = "Data successfully deleted.";
                        break;
                }
            }
            else if (result == "error")
                this.msg = "There is some issue in saving records, please contact to system administrator!"
            else
                this.msg = result;
        });
    }
    ngOnInit(): void {
        this.LoadContacts();
    }
    LoadContacts(): void {
        this._contactService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(contacts => { this.contacts =contacts; }
            //,error => this.msg = <any>error
        );
    }
    addContact() {
        this.dbops = DBOperation.create;
        this.modalTitle = "Add New Contact";
        this.modalBtnTitle = "Add";
        this.openDialog();
    }
    editContact(id: number) {
        this.dbops = DBOperation.update;
        this.modalTitle = "Edit Contact";
        this.modalBtnTitle = "Update";
        this.contact = this.contacts.filter(x => x.id == id)[0];
        this.openDialog();
    }
    deleteContact(id: number) {
        this.dbops = DBOperation.delete;
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.contact = this.contacts.filter(x => x.id == id)[0];
        this.openDialog();
    }
    
}

