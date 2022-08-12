import { InvoicesModel } from 'src/app/models/invoices.interface';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-show-invoice',
  templateUrl: './show-invoice.component.html',
  styleUrls: ['./show-invoice.component.css']
})
export class ShowInvoiceComponent implements OnInit {
  invoiceForm = new FormGroup({
    invoiceNumber: new FormControl(''),
    emitterName: new FormControl(''),
    emitterNit: new FormControl(''),
    receptorName: new FormControl(''),
    receptorNit: new FormControl(''),
    valueNoneVat: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    vat: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    totalValue: new FormControl('', Validators.pattern(/^-?(0|[1-9]\d*)?$/)),
    itemDescription: new FormControl(''),
    itemQuantity: new FormControl(''),
    itemUnitValue: new FormControl(''),
  });
  constructor(private authSvc: AuthService,private route: ActivatedRoute, private router: Router) { }
  invoice:InvoicesModel = new InvoicesModel();
  id:string='';

  ngOnInit(): void {
    this.getInvoice();
  }

  getInvoice(){
    this.id = this.route.snapshot.paramMap.get('id')??'';
    this.authSvc.showInvoice(this.id)
        .subscribe(res => {
          this.invoice = res.invoice;
          this.setValues();

    })
  }

  setValues() {
    const items = JSON.parse(this.invoice.items);
    this.invoiceForm
        .setValue({
          invoiceNumber: this.invoice.invoiceNumber,
          emitterName:  this.invoice.emitterName,
          emitterNit: this.invoice.emitterNit,
          receptorName: this.invoice.receptorName,
          receptorNit: this.invoice.receptorNit,
          valueNoneVat: this.invoice.valueNoneVat,
          vat: this.invoice.vat,
          totalValue: this.invoice.totalValue,
          itemDescription: items.description,
          itemQuantity: items.itemQuantity,
          itemUnitValue: items.itemUnitValue,
        })
  }
}
