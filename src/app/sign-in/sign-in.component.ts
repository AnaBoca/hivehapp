import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, NgForm } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

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

  model;

  ngOnInit(): void {
    this.model = {
      emailAddress: '',
      password: '',
    };
  }

  onSave() {
    if (this.form.valid) {
      console.log('Saved!');
    }
  }
}

function deepCopy<T>(object: T): T {
  if (object == null) {
    return object;
  }

  return JSON.parse(JSON.stringify(object));
}
