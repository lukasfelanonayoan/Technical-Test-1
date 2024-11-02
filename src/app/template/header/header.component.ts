import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthGuard } from 'src/app/authGuard';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  getStatus() {
    return sessionStorage.getItem('loginAs') !== null;
  }

  setStatus() {
    this.router.navigateByUrl('/');
    sessionStorage.removeItem('loginAs');
  }

  ngOnInit(): void {}
}
