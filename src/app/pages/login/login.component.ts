import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.loginForm = fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {}

  submitLogin() {
    let data = this.loginForm.value;
    if (data.username == 'admin' && data.password == 'admin') {
      sessionStorage.setItem('loginAs', data.username);
      this.router.navigate(['employee']);
    } else {
      alert('Your username or password is wrong!');
    }
  }
}
