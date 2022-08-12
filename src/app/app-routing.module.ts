import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { ContainerAppComponent } from './container-app/container-app.component';
import { AuthenticationGuard } from './components/guards/authentication.guard';
import { ShowInvoicesComponent } from './components/show-invoices/show-invoices.component';
import { CreateInvoiceComponent } from './components/create-invoice/create-invoice.component';
import { ShowInvoiceComponent } from './components/show-invoice/show-invoice.component';
import { UpdateInvoiceComponent } from './components/update-invoice/update-invoice.component';

const routes: Routes = [
  {
    path: '',
    component: ContainerAppComponent,
    children: [
      {
        path: 'login',
        loadChildren: () =>
        import('./components/login/login.module').then(m => m.LoginModule)
      },
      {
        path: 'showInvoices',
        canActivate: [AuthenticationGuard],
        component: ShowInvoicesComponent
      },
      {
        path: 'createInvoices',
        canActivate: [AuthenticationGuard],
        component: CreateInvoiceComponent
      },
      {
        path: 'showInvoice/:id',
        canActivate: [AuthenticationGuard],
        component: ShowInvoiceComponent
      },
      {
        path: 'updateInvoice/:id',
        canActivate: [AuthenticationGuard],
        component: UpdateInvoiceComponent
      },
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
      },
      {
        path: '**',
        redirectTo: 'login',
        pathMatch: 'full'
      }
    ]
  }

];

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
