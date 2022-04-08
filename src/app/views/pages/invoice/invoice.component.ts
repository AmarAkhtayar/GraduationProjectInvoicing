import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
// import { TourService } from 'ngx-tour-md-menu';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PlacementService } from '../../../core/services/placement.service';
import { debounceTime } from 'rxjs/operators';
import * as moment from 'moment';
import { FinanceService } from 'src/app/core/services/finance.service';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/core/services/auth.service';
import { v4 as uuidv4 } from 'uuid';


@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit, OnDestroy {
  title = 'Nieuwe Factuur aanmaken'
  destroyed$ = new Subject();

  formGroup: FormGroup;
  isFormSubmitted = false;
  PlacementCount: number;
  placements: any = [];
  newPlacement: any;
  projects: any;
  declarations: any = [];
  checked = false

  loaddeclarations = false
  checkedDeclarations = []
  noCheckedDeclarations = false
  noNumberOfDays = false
   dublicatedInvoiceNumber = null;
  selectedUser: any;
  numberOfDays: any = 0;
  invoiceCreated = false;
  constructor(
    // private tourService: TourService,
    private placementService: PlacementService,
    private formBuilder: FormBuilder,
    private financeService: FinanceService,
    private authUserService: AuthService,
    private router: Router) {
  }

  ngOnInit(): void {
    // this.tourInit();

    this.setupForm();
    this.getPlacements();
    // this.getPlacementProjects('974fd6bb-751b-4277-bf54-1618f71e7403');

    // this.getDeclarationListByProjectForSupplier("8fa55c1a-efa0-431d-9e88-002b9e21543e");

    this.formGroup.get('projects').valueChanges.pipe().subscribe(project => {
      this.getDeclarationListByProjectForSupplier(project);
    })

    this.formGroup.get('plaatsing').valueChanges.pipe(
      debounceTime(500)).subscribe(
        value => {
          console.log(value, 'valuevbnm --->');
          if (value)
            this.getPlacementProjects(value.key);
          // this.getPlacements(value)
        }
        // value => this.filter(value)
      );

  }
  selectRow(row: any) {
    this.selectedUser = row;
  }
  search = (term: string, item: any): boolean => {
    console.log(term, item, 'term', ' item', 'in search ---');
    return item.number.toLowerCase().includes(term.toLowerCase())
    // this.getPlacements(term)
  }

  placementChange(event: any) {
    console.log('placementChange ===>', event);

  }

  filter(value: string) {
    if (!value) {
      this.placements = this.newPlacement;
      return;
    }

    const newpl = this.placements.filter(placement => placement.number.toLowerCase().includes(value.toLowerCase()));

    this.placements = newpl;
    return newpl;
  }

  onNumberOfDaysChange(number: any) {
    this.numberOfDays = number
    

    // // if (this.numberOfDays)
    //   this.noNumberOfDays = false
  }

  getPlacements(): void {
    this.placementService.getplacements(1, 1).subscribe((placements: any) => {
      console.log(placements);
      // |date:'yyyy-MM-dd'
      placements.map(placement => {
        placement.startDate = moment(placement.startDate).format('DD-MM-yyyy')
        placement.endDate = moment(placement.endDate).format('DD-MM-yyyy')
        placement.fullElement = placement.number + ' ' + placement.supplierExecutiveFullName + ' (' + placement.startDate + ' / ' + placement.endDate + ' )'
      })

      this.placements = placements;
      console.log('placements',placements)
      this.newPlacement = placements;
    });
  }

  getPlacementProjects(placement): void {
    console.log("placements",placement)
    this.placementService.getProjectByplacement(placement).subscribe(projects => {
      console.log('projects ===>', projects);
      console.log('placementForProject', placement)
      this.projects = projects;
    });
  }


  getDeclarationListByProjectForSupplier(projectKey: any): void {
    console.log("projectKey",projectKey)
    this.financeService.getDeclarationListByProjectForSupplier(projectKey)
      .subscribe((declarations: any) => {
        this.loaddeclarations = true
        this.declarations = declarations.reverse()
        console.log('declarations', declarations)
      }
      );
  }

  onDeclarationsInputChange(event: any, key: any) {
    console.log(event, '---->', key);
    // else {
    if (event)
      this.checkedDeclarations.push(key)
    else
      this.checkedDeclarations.splice(this.checkedDeclarations.indexOf(key), 1)
    console.log('this.checkedDeclarations 333==>', this.checkedDeclarations);

  }

  onDeclarationsChange(event: any, key: any, rowClicked = false) {

    console.log('this.checkedDeclarations ==>', this.checkedDeclarations);

    if (rowClicked) {
      let foundInDeclarations = this.checkedDeclarations.indexOf(key)
      if (foundInDeclarations != -1)
        this.checkedDeclarations.splice(foundInDeclarations, 1)
      else
        this.checkedDeclarations.push(key)
      console.log('foundInDeclarations ===>', foundInDeclarations);
    }

    console.log('this.checkedDeclarations ==>', this.checkedDeclarations);

    if (this.checkedDeclarations.length == 0)
      this.noCheckedDeclarations = true
    else
      this.noCheckedDeclarations = false
  }

  // getAllPlacements(itemSize: number){
  //   this.placementService.getPlacements(1, itemSize).subscribe(placements => {
  //
  //     this.placements = placements['result'];
  //     console.log('placements ===>', this.placements);
  //   });
  // }

  setupForm(): void {
    this.formGroup = this.formBuilder.group({
      plaatsing: [null, { validators: [Validators.required] }],
      factuurnummer: [null, { validators: [Validators.required , Validators.maxLength(50)] }],
      projects: [null, { validators: [Validators.required] }],
      // paymentDiscountType: [null, { validators: [Validators.required] }],
      // declarations: [null, { validators: [Validators.required] }],

    });
  }

  onlyNumberKey(evt) {

    // Only ASCII character in that range allowed
    const ASCIICode = (evt.which) ? evt.which : evt.keyCode;
    console.log("asciiiiii", ASCIICode)
    return !(ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57));
    

  }

  submitForm() {

    if (!this.formGroup.valid) {
      Object.keys(this.formGroup.controls).forEach(key => {
        this.formGroup.get(key).markAsTouched()
      })
      if (this.checkedDeclarations.length == 0)
        this.noCheckedDeclarations = true

      return
    }
    if (this.checkedDeclarations.length == 0) {
      this.noCheckedDeclarations = true
      return
    }
    this.isFormSubmitted = true;

    let plaatsing = this.formGroup.get('plaatsing').value
    let formBody = {
      IBANRekeningnummer: uuidv4(),
      // plaatsing: plaatsing.key,
      key: uuidv4(),//this.formGroup.get('projects').value,
      number: this.formGroup.get('factuurnummer').value,
      paymentDiscountType: this.numberOfDays,
      declarations: this.checkedDeclarations
    }


    this.financeService.createInvoice(formBody, uuidv4()).subscribe(res => {
      this.isFormSubmitted = false;
      console.log( 'createDebitInvoice ==>', res);
    
      this.invoiceCreated = true
      setTimeout(() => {
        this.router.navigate(['/'])
      }, 800);
    }, err => {
     
      this.isFormSubmitted = false;
      for(let error = 0 ;  error< err.error.errors.length; error++){
        if(err.error.errors[error].errorNumber== 5){
          setTimeout(() => {
            this.dublicatedInvoiceNumber = null;
          }, 6000);
          this.dublicatedInvoiceNumber = err.error.errors[error].message
          
        }
        
      }
      console.log('err ===>', err.error.errors);

    })

    // if (this.formGroup.invalid) {
    //   return;
    // }
    // else {
    //   this.router.navigate(['/invoice-details']);
    // }

  }

  // tourInit(): void {
  //   this.tourService.initialize([
  //     {
  //       anchorId: 'invoice.test.1',
  //       title: 'test 1',
  //       content: 'content 2',
  //     },
  //     {
  //       anchorId: 'invoice.test.2',
  //       title: 'test 2',
  //       content: 'content 2'
  //     }
  //   ]);
  // }

  // startTour(): void {
  //   this.tourService.start();

  // }

  ngOnDestroy(): void {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

}
