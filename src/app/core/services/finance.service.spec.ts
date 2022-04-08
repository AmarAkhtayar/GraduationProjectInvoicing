import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FinanceService } from './finance.service';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Invoice } from '../models/invoice.model'


describe('FinanceService', () => {
    let httpClient: HttpClient
    let httpTestingController: HttpTestingController
    let financeService: FinanceService

    beforeEach(() => {
        //Configures testing app module
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [
                FinanceService
            ]
        });

        //Instantaites HttpClient, HttpTestingController and FinanceService
        httpClient = TestBed.inject(HttpClient);
        httpTestingController = TestBed.inject(HttpTestingController);
        financeService = TestBed.inject(FinanceService);
    });

    afterEach(() => {
        httpTestingController.verify(); //Verifies that no requests are outstanding.
    });

    /****************************** Create new Invoice ****************************************** */
    it('should create one invoice', () => {
        const invoiceMoc =
        {
            date: "2021-11-30T19:26:03.1737205Z",
            key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b",
            number: "200",
            profitNumber: 11,
            totalExclusiveVat: 110,
            totalInclusiveVat: 133.1
        }

        let requestId = 'd17d120e-a71e-4d63-a3a3-7c2ba3c5211e'
        financeService.createInvoice(invoiceMoc, requestId)
            .subscribe((invoice: any) => {
                // console.log('invoice ===>', invoicePagedForSupplier);
                expect(invoice).toBeTruthy();
                expect(invoice).toEqual(invoiceMoc);
                expect(invoice).toBe(invoiceMoc);
            }, (error) => {

              (error: HttpErrorResponse) => {
                  // fail
                    expect(error.status).toBe(404);
                }
            });


        const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/CreateDebitInvoice');

        expect(req.request.method).toEqual("POST");

        console.log(req.request);

        req.flush(invoiceMoc);
    });

    it('should find an invoice by invoiceDetials key', () => {
        const invoiceMoc = {
            date: "2021-11-30T19:26:03.1737205Z",
            key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b",
            number: "200",
            profitNumber: 11,
            totalExclusiveVat: 110,
            totalInclusiveVat: 133.1
        };

        let key = 'a340a7e1-d1ca-4d02-9500-159b8fe6380b'
        financeService.getInvoiceDetails(key)
            .subscribe((invoice: any) => {
                console.log('invoice ===>', invoice);
                expect(invoice).toBeTruthy();
                expect(invoice).toEqual(invoiceMoc);
                expect(invoice.key).toBe(key);
            }, (error) => {

                (error: HttpErrorResponse) => {
                    expect(error.status).toBe(404);
                }
            });


        const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/DetailsForSupplier?key=' + key);

        expect(req.request.method).toEqual("GET");

        console.log(req.request);

        req.flush(invoiceMoc);
        /****************************** get Paged For Supplier****************************************** */


    });


    describe('#getAllInvoices', () => {
        //Test case 1
        it('should return all invoices', () => {
             //Dummy data to be returned by request
            const invoicesMoc = [{

                date: "2021-11-30T19:26:03.1737205Z",
                key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b",
                number: "900",
                profitNumber: 22,
                totalExclusiveVat: 110,
                totalInclusiveVat: 133.1
            },
            {
                date: "2021-11-30T19:26:03.1737205Z",
                key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b1",
                number: "200",
                profitNumber: 11,
                totalExclusiveVat: 110,
                totalInclusiveVat: 133.1
            },
            ]

            let pageSize = 2;
            let pageNumber = 1;

            financeService.getInvoicePagedForSupplier(pageNumber, pageSize)
                .subscribe((invoicePagedForSupplier: any) => {
                     console.log('invoicepaged1 ===>', invoicePagedForSupplier);
                    expect(invoicePagedForSupplier).toBeTruthy();
                    expect(invoicePagedForSupplier).toEqual(invoicesMoc);
                    expect(invoicePagedForSupplier.length).toBe(pageSize);
                }, (error) => {

                    (error: HttpErrorResponse) => {
                        // fail
                        expect(error.status).toBe(404);
                    }
                });


            const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/PagedForSupplier?pageNumber=' + pageNumber + '&pageSize=' + pageSize);

            expect(req.request.method).toEqual("GET");

            console.log(req.request);

            req.flush(invoicesMoc);
        });
        // Test case 2
        it('should return two invoices', () => {
            const invoicesMoc = [{

                date: "2021-11-30T19:26:03.1737205Z",
                key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b",
                number: "900",
                profitNumber: 22,
                totalExclusiveVat: 110,
                totalInclusiveVat: 133.1
            },
            {
                date: "2021-11-30T19:26:03.1737205Z",
                key: "a340a7e1-d1ca-4d02-9500-159b8fe6380b1",
                number: "200",
                profitNumber: 11,
                totalExclusiveVat: 110,
                totalInclusiveVat: 133.1
            },
            ]
    
    
        let pageSize = 2;
        let pageNumber = 1;

        financeService.getInvoicePagedForSupplier(pageNumber, pageSize)
            .subscribe((invoicePagedForSupplier: any) => {
                // console.log('invoice ===>', invoicePagedForSupplier);
                expect(invoicePagedForSupplier).toBeTruthy();
                expect(invoicePagedForSupplier).toEqual(invoicesMoc);
                expect(invoicePagedForSupplier.length).toBe(pageSize);
            }, (error) => {

                (error: HttpErrorResponse) => {
                    // fail("the save course operation should have failed")
                    expect(error.status).toBe(404);
                }
            });


        const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/PagedForSupplier?pageNumber=' + pageNumber + '&pageSize=' + pageSize);

        expect(req.request.method).toEqual("GET");

        console.log("reqqqqqqq",req.request);

        req.flush(invoicesMoc);
    });



        //Test case 3
        it('should be OK returning no invoices', () => {
            let pageSize = 1
            let pageNumber = 1

            financeService.getInvoicePagedForSupplier(pageNumber, pageSize).subscribe(
                (invoicePagedForSupplier: any) => expect(invoicePagedForSupplier.length)
                    .toEqual(0, 'should have empty invoices array'),
                fail
            );

            const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/PagedForSupplier?pageNumber=' + pageNumber + '&pageSize=' + pageSize);
            req.flush([]); //Return empty data
        });

    });

    it('should download one invoice', () => {
        const invoiceMoc = {
            content: "JVBERi0xLjQKMSAwIG9iago8PAovVGl0bGUgKP7/AEQAZQBjA",
            fileName: "5309127.pdf",
            mimeType: "application/pdf"
        };

        let key = 'a340a7e1-d1ca-4d02-9500-159b8fe6380b'
        // here we send the request to the backend, then we get the reponse back; afterwards we 
        // check the returend request with the ,mocked invoice we created
        financeService.DownloadInvoice(key)
            .subscribe((invoice: any) => {
                console.log('invoice created ===>', invoice);
                expect(invoice).toBeTruthy();
                expect(invoice).toEqual(invoiceMoc);
                expect(invoice.mimeType).toBe("application/pdf");
            }, (error) => {

                (error: HttpErrorResponse) => {
                    // fail("the save course operation should have failed")
                    expect(error.status).toBe(404);
                }
            });


        const req = httpTestingController.expectOne(financeService.mainPath + 'Reijn/Development/Finance/Api/Invoice/DownloadInvoice?key=' + key);

        expect(req.request.method).toEqual("GET");

        console.log(req.request);

        req.flush(invoiceMoc);

    });








});

