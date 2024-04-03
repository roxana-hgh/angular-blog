import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });;
  isAuthenticated: boolean = false;

  constructor(private fb: FormBuilder,   private router: Router,) { }

  ngOnInit(): void {
    
  }

  login(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    if (username === 'admin' && password === 'admin') {
      this.isAuthenticated = true;
      localStorage.setItem('isAuthenticated', 'true');
      this.router.navigate(['home']);
    } else {
      alert('Invalid username or password.');
    }
  }

}