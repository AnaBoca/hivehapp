import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, NgForm, NgModel } from '@angular/forms';
import { AuthService } from 'auth/src/lib/auth.service';

@Component({
  selector: 'sign-in',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
})
export class SignInComponent implements OnInit {
  @ViewChild('signInForm') form: NgForm;

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
    console.log('ON SAVE');
  }
}

function deepCopy<T>(object: T): T {
  if (object == null) {
    return object;
  }

  return JSON.parse(JSON.stringify(object));
}
