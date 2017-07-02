import { NgModule } from "@angular/core";
import { ContactService } from './service/contact.service';
import { APP_BASE_HREF } from "@angular/common";
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule, NoopAnimationsModule } from "@angular/platform-browser/animations";
import { MaterialModule, MdNativeDateModule } from '@angular/material';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { ContactComponent } from './components/contact.component';
import { ManageContact } from './components/managecontact.component';


@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule,
	MaterialModule,
        MdNativeDateModule,
        BrowserAnimationsModule, NoopAnimationsModule, 
        routing],
    declarations: [AppComponent, ContactComponent, ManageContact],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, ContactService],
    entryComponents: [ManageContact],
    bootstrap: [AppComponent]
})

export class AppModule { }
