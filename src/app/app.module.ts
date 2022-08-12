import { ShowInvoicesComponent } from './components/show-invoices/show-invoices.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContainerAppComponent } from './container-app/container-app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ShowInvoiceComponent } from './components/show-invoice/show-invoice.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';


@NgModule({
  declarations: [
    AppComponent,
    ContainerAppComponent,
    ShowInvoicesComponent,
    CreateInvoiceComponent,
    ShowInvoiceComponent,
    UpdateInvoiceComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
