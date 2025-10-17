import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'ek-sidenav-header',
  imports: [MatIconModule, MatButtonModule],
  templateUrl: './sidenav-header.component.html',
  styleUrl: './sidenav-header.component.scss'
})
export class SidenavHeaderComponent {
  @Input() expanded: boolean = false;
  @Output() toggleSidenav = new EventEmitter();
}
