import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  {path: '', component: HomeComponent},
];

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    NgxPaginationModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule {
}
