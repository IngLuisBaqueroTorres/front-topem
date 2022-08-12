import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { InvoicesModel } from 'src/app/models/invoices.interface';

@Component({
  selector: 'app-create-invoice',
  templateUrl: './create-invoice.component.html',
  styleUrls: ['./create-invoice.component.css']
})
export class CreateInvoiceComponent implements OnInit {

  createForm = new FormGroup({
    invoiceNumber:  new FormControl('', Validators.required),
    emitterName: new FormControl('', Validators.required),
    emitterNit: new FormControl('',Validators.required),
    receptorName: new FormControl('',Validators.required),
    receptorNit: new FormControl('',Validators.required),
    valueNoneVat: new FormControl('',Validators.required),
    vat: new FormControl('',Validators.required),
    totalValue: new FormControl('',Validators.required),
    itemDescription: new FormControl('',Validators.required),
    itemQuantity: new FormControl('',Validators.required),
    itemUnitValue: new FormControl('',Validators.required),
  });
  constructor(private authSvc: AuthService, private route: Router) { }

  ngOnInit(): void {
  }
  onRegister(form: InvoicesModel){
console.log( form.itemDescription)
let request;
request = form;
request.emitterName = form.emitterName;
request.emitterNit = form.emitterNit;
request.invoiceNumber = form.invoiceNumber;
request.items={
  "description":form.itemDescription,
  "quantity":form.itemQuantity,
  "unitAmount":form.itemUnitValue,
  "totalAmount":(form.itemUnitValue * form.itemQuantity)
}
request.items.itemQuantity = form.itemQuantity;
request.items.itemUnitValue = form.itemUnitValue;
    if(this.createForm.invalid==false){
      this.authSvc.createInvoice(request)
        .subscribe(res => {
          console.log('Successfully', res);
          this.route.navigate(['/showInvoices']);
    })
    }

  }
}
