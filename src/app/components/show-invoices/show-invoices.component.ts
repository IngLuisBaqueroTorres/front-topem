import { LiveAnnouncer } from '@angular/cdk/a11y';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { InvoicesModel } from 'src/app/models/invoices.interface';
import { InvoicesService } from 'src/app/shared/services/invoices.service';

const ELEMENT_DATA: InvoicesModel[] = [
  {id:"1",invoiceNumber:"0001",emitterName:"Carlos",receptorName:"Eduardo",valueNoneVat:5000, vat:2000,totalValue:7000},
  {id:"1",invoiceNumber:"0002",emitterName:"Andrez",receptorName:"Felipe",valueNoneVat:15000, vat:22000,totalValue:37000},
];

@Component({
  selector: 'app-show-invoices',
  templateUrl: './show-invoices.component.html',
  styleUrls: ['./show-invoices.component.css']
})
export class ShowInvoicesComponent implements OnInit {

  displayedColumns: string[] = ['invoiceNumber', 'emitterName', 'receptorName', 'valueNoneVat', 'vat', 'totalValue','acciones'];
  // dataSource:InvoicesModel[]=[];
@ViewChild(MatPaginator) paginator!: MatPaginator;
@ViewChild(MatSort) sort!:MatSort;
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  constructor(private invoicesService:InvoicesService,
    private changeDetectorRefs: ChangeDetectorRef,
    private _liveAnnouncer: LiveAnnouncer) { }

  ngOnInit() {
    this.actualizarTabla();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  actualizarTabla(){
    this.invoicesService.getAll().subscribe(res=>
      {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.changeDetectorRefs.detectChanges();
      })
  }

  // eliminar(id){
  //   this.invoicesService.delete(id).subscribe(
  //     res=>{
  //       this.actualizarTabla();
  //     }
  //   );
  // }

  applyFilter(event: Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
