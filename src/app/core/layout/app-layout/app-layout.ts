import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'ti-app-layout',
  imports: [MatToolbarModule, MatIconModule],
  templateUrl: './app-layout.html',
  styleUrl: './app-layout.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppLayout {
  readonly currentYear = new Date().getFullYear();
}
