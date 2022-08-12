import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/auth.service';
import { InvoicesModel } from 'src/app/models/invoices.interface';

@Component({
  selector: 'app-update-invoice',
  templateUrl: './update-invoice.component.html',
  styleUrls: ['./update-invoice.component.css'],
})
export class UpdateInvoiceComponent implements OnInit {
  updateForm = new FormGroup({
    invoiceNumber: new FormControl('', Validators.required),
    emitterName: new FormControl('', Validators.required),
    emitterNit: new FormControl('', Validators.required),
    receptorName: new FormControl('', Validators.required),
    receptorNit: new FormControl('', Validators.required),
    valueNoneVat: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    vat: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    totalValue: new FormControl('', [Validators.required,Validators.pattern(/^-?(0|[1-9]\d*)?$/)]),
    itemDescription: new FormControl('', Validators.required),
    itemQuantity: new FormControl('', Validators.required),
    itemUnitValue: new FormControl('', Validators.required),
  });
  constructor(private authSvc: AuthService,private route: ActivatedRoute, private router: Router) {}
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
    this.updateForm.setValue({
      invoiceNumber: this.invoice.invoiceNumber,
      emitterName: this.invoice.emitterName,
      emitterNit: this.invoice.emitterNit,
      receptorName: this.invoice.receptorName,
      receptorNit: this.invoice.receptorNit,
      valueNoneVat: this.invoice.valueNoneVat,
      vat: this.invoice.vat,
      totalValue: this.invoice.totalValue,
      itemDescription: items.description,
      itemQuantity: items.itemQuantity,
      itemUnitValue: items.itemUnitValue,
    });
  }

  onUpdate(form: InvoicesModel) {
    console.log(form.itemDescription);
    let request;
    request = form;
    request.emitterName = form.emitterName;
    request.emitterNit = form.emitterNit;
    request.invoiceNumber = form.invoiceNumber;
    request.items = {
      description: form.itemDescription,
      quantity: form.itemQuantity,
      unitAmount: form.itemUnitValue,
      totalAmount: form.itemUnitValue * form.itemQuantity,
    };
    request.items.itemQuantity = form.itemQuantity;
    request.items.itemUnitValue = form.itemUnitValue;
    if (this.updateForm.invalid == false) {
      console.log("request: ",request);
      this.authSvc.updateInvoice(this.id, request).subscribe((res) => {
        this.router.navigate(['/showInvoices']);
      });
    }
  }
}
