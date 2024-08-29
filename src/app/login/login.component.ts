import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  public loginForm!: FormGroup;

  constructor(
    private formbuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      user_Email: ['', [Validators.required, Validators.email]],
      user_Password: ['', Validators.required]
    });
  }

  login(): void {
    this.http.get<any[]>('https://localhost:7299/api/signups').subscribe(
      (res) => {
        console.log('API Response:', res);
        console.log('Login Form Values:', this.loginForm.value);
  
        const signupUser = res.find((a: any) => {
          return (
            a.user_Email === this.loginForm.value.user_Email &&
            a.user_Password === this.loginForm.value.user_Password
          );
        });
  
        if (signupUser) {
          console.log('signupUser found:', signupUser);
          console.log('User Email:', signupUser.user_Email);
          console.log('User Password:', signupUser.user_Password);
  
          localStorage.setItem('signupUser', JSON.stringify(signupUser));
          this.router.navigate(['/home']);
        } else {
          console.warn('No matching user found');
          alert('User not found');
        }
      },
      (err) => {
        console.error('Error occurred:', err);
        alert('Something went wrong');
      }
    );
  }
  
}
