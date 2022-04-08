import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FinanceService } from 'src/app/core/services/finance.service';

@Component({
  selector: 'app-invoice-detail',
  templateUrl: './invoice-detail.component.html',
  styleUrls: ['./invoice-detail.component.scss']
})
export class InvoiceDetailComponent implements OnInit {
  invoiceDetail: any
  pdf: any

  invoiceId: any
  constructor(private financeService: FinanceService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.invoiceId = this.route.snapshot.params['invoiceId']
    this.getInvoice(this.invoiceId)
    // this.downloadInvoice()
  }

  getInvoice(key: any) {
    this.financeService.getInvoiceDetails(key)
      .subscribe(invoiceDetail => {
        console.log('invoiceDetail ==>', invoiceDetail);
        this.invoiceDetail = invoiceDetail
      })
  }

  downloadInvoice() {
    this.financeService.DownloadInvoice(this.invoiceId)
      .subscribe(res => {
        this.pdf = res
        console.log('downloaded invoice', res)

        let linkSource = `data:application/pdf;base64,${this.pdf.content}`;
        let downloadLink = document.createElement("a");
        let fileName = this.invoiceDetail.number + ".pdf";

        downloadLink.href = linkSource;
        downloadLink.download = fileName;
        downloadLink.click();
      })
  }



}
