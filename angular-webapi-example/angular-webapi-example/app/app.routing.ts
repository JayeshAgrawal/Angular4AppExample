import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ContactComponent } from './components/contact.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'contact', pathMatch: 'full' },    
    { path: 'contact', component: ContactComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);