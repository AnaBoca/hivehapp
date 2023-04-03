import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AuthService } from 'auth/src/lib/auth.service';

@Component({
  selector: 'sign-up',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
  ],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  @ViewChild('signUpForm') form: NgForm;

  model: any;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    this.model = {
      emailAddress: '',
      password: '',
    };
  }

  onSave() {
    this.authService.SignIn(
      this.form.controls['email'].value,
      this.form.controls['password'].value
    );
  }
}
