import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BreakpointObserver } from '@angular/cdk/layout';
import { MsalService } from '@azure/msal-angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss']
})
export class SideMenuComponent implements OnInit, AfterViewInit {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  user: any
  userName: any;
  constructor(private observer: BreakpointObserver,
    private authService: MsalService,
    private authUserService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.user = this.authUserService.getUserInfo()
    console.log('this.user ==== ------=>', this.user);
    // this.userName= this.user.name;
    // console.log('this.username ==== ------=>', this.userName);

    // this.authUserService.userSubject.subscribe(res => {
    //   this.user = this.authUserService.getUserInfo()
    //   console.log('  this.user ===>', this.user);

    // })

  }

  ngAfterViewInit(): void {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
    this.cdr.detectChanges();
  }

  logout(): void {
    this.authService.logout();
    localStorage.removeItem('IDTOKEN')
    localStorage.removeItem('JWt')
    this.router.navigate(['/'])
  }
}
