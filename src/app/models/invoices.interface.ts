export class InvoicesModel {
  id?:any;
  invoiceNumber?: any;
  emitterName?: any;
  emitterNit?: any;
  receptorName?: any;
  receptorNit?: any;
  valueNoneVat?: any;
  vat?: any;
  totalValue?: any;
  items?: any;
  itemDescription?:any;
  itemQuantity?:any;
  itemUnitValue?:any;

}

export class Items
{
  itemDescription?: any ;
  itemQuantity?:any;
  itemUnitValue?:any;
}
