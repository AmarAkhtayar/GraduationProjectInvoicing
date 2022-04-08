import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {HttpClient, HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';

import {AppComponent} from './app.component';
import {AppRoutingModule} from './app-routing.module';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {LayoutsModule} from './views/layouts/layouts.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatDividerModule} from '@angular/material/divider';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {NavbarComponent} from './views/layouts/base/navbar/navbar.component';
import {SideMenuComponent} from './views/layouts/base/side-menu/side-menu.component';
import {TourMatMenuModule} from 'ngx-tour-md-menu';

import {
  MsalInterceptor,
  MsalInterceptorConfiguration,
  MsalModule,
  MsalService,
  MSAL_INSTANCE,
  MSAL_INTERCEPTOR_CONFIG
} from '@azure/msal-angular';
import {
  BrowserCacheLocation,
  InteractionType,
  IPublicClientApplication,
  PublicClientApplication
} from '@azure/msal-browser';
import {b2cPolicies} from './b2c-config';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthInterceptor} from './core/interceptors/auth.interceptor.service';
import {AuthService} from './core/services/auth.service';
import { ApiService } from './api.service';


export function MSALInstanceFactory(): IPublicClientApplication {
  return new PublicClientApplication({
    auth: {
      clientId: '0f2ead41-78bc-412d-92a1-8ebf6a954c97',
      authority: b2cPolicies.authorities.signUpSignIn.authority,
      redirectUri: 'http://localhost:2000',
      knownAuthorities: [b2cPolicies.authorities.signUpSignIn.authority]
    }
  });

}

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>();
  protectedResourceMap.set('https://graph.microsoft.com/v1.0/me', ['user.read', 'mail.read']);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap
  };

}

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SideMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutsModule,
    NgbModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule,
    TourMatMenuModule.forRoot(),
    MsalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    // HttpClient
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
    , {
      provide: MSAL_INSTANCE,
      useFactory: MSALInstanceFactory
    }, {
      provide: MSAL_INTERCEPTOR_CONFIG,
      useFactory: MSALInterceptorConfigFactory
    },
    MsalService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
