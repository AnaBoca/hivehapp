import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'auth/src/lib/auth.service';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'verify-email',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.scss'],
})
export class VerifyEmailComponent {
  constructor(public authService: AuthService) {}
}
