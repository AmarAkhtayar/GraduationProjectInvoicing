import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgSelectModule } from '@ng-select/ng-select';

import { InvoiceComponent } from './invoice.component';

describe('Create Invoice component test', () => {
    let component: InvoiceComponent;
    let fixture: ComponentFixture<InvoiceComponent>;
    beforeEach(async () => {
        TestBed.configureTestingModule({
            declarations: [
                InvoiceComponent
            ],
            imports: [
                HttpClientTestingModule,
                FormsModule,
                ReactiveFormsModule,
                RouterTestingModule,
                NgSelectModule
            ]
        }).compileComponents();
        fixture = TestBed.createComponent(InvoiceComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    })


    it('should create invoice component', () => {
     expect(component).toBeDefined();
    })
    it(`should have as title 'Nieuwe Factuur aanmaken'`, () => {
        expect(component.title).toEqual('Nieuwe Factuur aanmaken');
      });

                 //Form Validity
        it('form invalid when empty', () => {
            expect(component.formGroup.valid).toBeFalsy();
          });
          // fields validaty
          // 1 
          it('[placement validaty]', () => {
            let plaatsing = component.formGroup.controls['plaatsing'];
            expect(plaatsing.valid).toBeFalsy();
            expect(plaatsing.errors['required']).toBeTruthy();
            plaatsing.setValue('Gemeente Sittard');
            expect(plaatsing.valid).toBeTruthy();
          });
          it('[invoice number validaty]', () => {
            let invoiceNumber = component.formGroup.controls['factuurnummer'];
            expect(invoiceNumber.valid).toBeFalsy();
            expect(invoiceNumber.errors['required']).toBeTruthy();
       
          });
     
})
//   let de: DebugElement;
//   let el: HTMLElement;

//   beforeEach(async(() => {
//     TestBed.configureTestingModule({
//       declarations: [
//         InvoiceComponent
//       ],
//       providers: [
//         // NgxmTourService
//       ],
// let testPlaatsing = component.formGroup.controls['plaatsing'];
// testPlaatsing.setValue('Gemeente Sittard');
// let testProjects = component.formGroup.controls['projects'];
// testProjects.setValue('project111 gemeente');
// let testFactuurNummer = component.formGroup.controls['factuurnummer'];
// testFactuurNummer.setValue(1);
//       imports: [
//         BrowserModule,
//         RouterTestingModule,
//         FormsModule,
//         HttpClientModule,
//         ReactiveFormsModule
//       ]
//     }).compileComponents().then(() => {
//       fixture = TestBed.createComponent(InvoiceComponent);

//       comp = fixture.componentInstance; // ContactComponent test instance
//       // query for the title <h1> by CSS element selector
//       de = fixture.debugElement.query(By.css('form'));
//       el = de.nativeElement;
//     });
//   }));

//   it(`should have as text 'Nieuwe Factuur aanmaken'`, async(() => {
//     expect(comp.title).toEqual('Nieuwe Factuur aanmaken');
//   }))

//   // it(`should set submitted to true`, async(() => {
//   //   comp.submitForm();
//   //   expect(comp.isFormSubmitted).toBeTruthy();
//   // }));

//   // it(`should call the onSubmit method`, async(() => {
//   //   spyOn(comp, 'submitForm');
//   //   // el = fixture.debugElement.querySelector('button').nativeElement;
//   //   // el = fixture.debugElement.query(By.css('button')).nativeElement.click();

//   //   el = fixture.debugElement.nativeElement.querySelector('button');
//   //   el.click();
//   //   expect(comp.submitForm).toHaveBeenCalled();
//   // }));

//    it(`form should be invalid`, async(() => {
//       comp.formGroup.controls['plaatsing'].setValue('');
//       comp.formGroup.controls['factuurnummer'].setValue('');
//       comp.formGroup.controls['projects'].setValue('');
//       comp.formGroup.controls['paymentDiscountType'].setValue('');
//       expect(comp.formGroup.valid).toBeFalsy();
//     }));

//   //   it(`form should be valid`, async(() => {
//   //     comp.formGroup.controls['email'].setValue('asd@asd.com');
//   //     comp.formGroup.controls['name'].setValue('aada');
//   //     comp.formGroup.controls['text'].setValue('text');
//   //     expect(comp.formGroup.valid).toBeTruthy();
//   //   }));
