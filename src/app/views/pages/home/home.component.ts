import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, takeUntil } from 'rxjs/operators';
import { FinanceService } from 'src/app/core/services/finance.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;

  private destroyed$ = new Subject();
  tempInvoices = [];

  totalItems = 0
  currentPage: 1
  invoices: any
  pageSize = 10
  searchItem = ""
  pdf: any
  checkedInvoices = []
  isLoading = false;
  // invoices = [{
  //   invoice_number: 24,
  //   placement: 'Gemeente',
  //   product_owner: 'amar',
  //   invoice_date: '21-09-2021',
  //   client: 'mm',
  //   value: 1,
  //   tax_value: 20,
  //   invoice_sort: 'credit'
  // },
  // {
  //   invoice_number: 66,
  //   placement: 'Gemeente2',
  //   product_owner: 'amar2',
  //   invoice_date: '21-06-2021',
  //   client: 'mm2',
  //   value: 3,
  //   tax_value: 20,
  //   invoice_sort: 'credit'
  // }
  // ];


  constructor(private financeService: FinanceService,
    private router: Router) {
  }

  ngOnInit(): void {

    this.tempInvoices = this.invoices;
    this.setSearchInputListener();

    this.getInvoicePaged(1)
  }

  getInvoicePaged(page: any) {
    // main goal behind isLoading is to view loading while getting all the data from 
    // service
    this.isLoading = true;
    this.financeService.getInvoicePagedForSupplier(page, this.pageSize, 'Date', 2, this.searchItem)
      .subscribe(res => {
        this.currentPage = page
        this.isLoading = false;
        this.invoices = res
        console.log(page, 'getInvoicePagedForSupplier ==>', res);

      })
  }


  pageChange(page: any) {
    if (this.currentPage != page)
      this.getInvoicePaged(page)
  }

  setSearchInputListener(): void {
    fromEvent(this.searchInput.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value;
        }),
        debounceTime(400),
        distinctUntilChanged(),
        takeUntil(this.destroyed$)
      ).subscribe((text: any) => {
        this.searchItem = text
        this.getInvoicePaged(1)
      });
  }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  openInVoiceDetails(key: any) {
    this.router.navigate(['invoice', key, 'details'])
  }

  downloadMultipleInvoice() {
    if (this.checkedInvoices.length == 0) return
    for (let checkedInvoice of this.checkedInvoices) {
      this.downloadInvoice(checkedInvoice, checkedInvoice);
    }
  }

  downloadInvoice(invoiceId: any, invoiceNumber: any) {
    this.financeService.DownloadInvoice(invoiceId)
      .subscribe(res => {
        this.pdf = res
        console.log('downloaded invoice', res)

        let linkSource = `data:application/pdf;base64,${this.pdf.content}`;
        let downloadLink = document.createElement("a");
        let fileName = invoiceNumber + ".pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
  }

  onInvoicesChange(event: any, key: any, rowClicked = false) {

    console.log('this.checkedDeclarations ==>', this.checkedInvoices);

    if (rowClicked) {
      let foundInDeclarations = this.checkedInvoices.indexOf(key)
      if (foundInDeclarations != -1)
        this.checkedInvoices.splice(foundInDeclarations, 1)
      else
        this.checkedInvoices.push(key)
      console.log('foundInDeclarations ===>', foundInDeclarations);
    }

  }
}

