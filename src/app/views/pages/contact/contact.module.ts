import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { TourMatMenuModule } from 'ngx-tour-md-menu';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NgSelectModule } from '@ng-select/ng-select';
import { ContactComponent } from './contact/contact.component';
import { MatIconModule } from '@angular/material/icon';

import { MatButtonModule } from '@angular/material/button';
const routes: Routes = [
  { path: '', component: ContactComponent },
];

@NgModule({
  declarations: [
    ContactComponent,
    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    // TourMatMenuModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class ContactModule {
}
