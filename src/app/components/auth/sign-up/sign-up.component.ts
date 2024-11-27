import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.css',
})
export class SignUpComponent {
  RegisterForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  wasSuccess: boolean = false;
  wasFailed: boolean = false;
  error!: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onRegister() {
    const email = this.RegisterForm.get('email')?.value;
    const password = this.RegisterForm.get('password')?.value;
    this.authService.signup(email, password).subscribe(
      (signupData) => {
        console.log(signupData);
        this.wasSuccess = true;
      },
      (errorMessage) => {
        console.log('error');
        console.log(errorMessage);
        this.error = errorMessage;
      }
    );
  }
}
