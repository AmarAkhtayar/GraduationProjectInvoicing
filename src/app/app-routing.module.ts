import {NgModule} from '@angular/core';
import {PreloadAllModules, RouterModule, Routes} from '@angular/router';
import {InvoiceDetailComponent} from './views/pages/invoice/invoice-detail/invoice-detail.component';


const routes: Routes = [


  /* path: '',
   component: HomeComponent*/
  {
    path: '',
    loadChildren: () => import('./views/pages/home/home.module').then(m => m.HomeModule),
  },
  {
    path: 'invoice',
    loadChildren: () => import('./views/pages/invoice/invoice.module').then(m => m.InvoiceModule),
  },
  {
    path: 'contact',
    loadChildren: () => import('./views/pages/contact/contact.module').then(m => m.ContactModule),
  },
  
  // {
  //   path: 'invoice-details',
  //   component: InvoiceDetailComponent
  // }



];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes,
      //{
       // scrollPositionRestoration: 'top',
      //  preloadingStrategy: PreloadAllModules
      //}
)
  ],
  exports: [
    RouterModule
  ],
})
export class AppRoutingModule {
}
