import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'dashboard-routing',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    RouterModule,
  ],
  templateUrl: './dashboard-routing.component.html',
  styleUrls: ['./dashboard-routing.component.scss'],
})
export class DashboardRoutingComponent implements OnInit {
  private media = inject(MediaMatcher);
  private changeDetectorRef = inject(ChangeDetectorRef);
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnInit() {
    this.wireMediaListener();
  }

  private wireMediaListener() {
    this.mobileQuery = this.media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => {
      this.changeDetectorRef.detectChanges();
    };
    this.mobileQuery.addEventListener('change', this._mobileQueryListener);
  }
}
