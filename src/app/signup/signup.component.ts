import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { SignupService,Tata } from '../signup.service';
@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public signUpForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private signupService: SignupService,  // Inject SignupService
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      UserName: ['', Validators.required],
      User_Email: ['', [Validators.required, Validators.email]],
      User_Password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
      profileImage: [null]
    }, {
      validator: this.mustMatch('User_Password', 'confirmPassword')
    });
  }

  signUp() {
    if (this.signUpForm.invalid) {
      return;
    }

    const tata: Tata = {
      id: 0,  // Set default or managed by backend
      UserName: this.signUpForm.get('UserName')?.value,
      User_Email: this.signUpForm.get('User_Email')?.value,
      User_Password: this.signUpForm.get('User_Password')?.value,
      confirmpassword: this.signUpForm.get('confirmPassword')?.value
    };

    this.signupService.postItem(tata).subscribe(
      res => {
        alert('SIGNUP SUCCESSFUL');
        this.signUpForm.reset();
        this.router.navigate(["/login"]);
      },
      err => {
        alert("Something went wrong");
      }
    );
  }

  mustMatch(password: string, confirmPassword: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[password];
      const matchingControl = formGroup.controls[confirmPassword];

      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }

      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
  }

  togglePasswordVisibility(): void {
    const passwordInput = document.getElementById('User_Password') as HTMLInputElement;
    if (passwordInput.type === 'password') {
      passwordInput.type = 'text';
    } else {
      passwordInput.type = 'password';
    }
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.signUpForm.patchValue({
        profileImage: file
      });
    }
  }
}
