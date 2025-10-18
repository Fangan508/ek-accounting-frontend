import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from './services/sidenav.service';
import { SidenavContentComponent } from "./components/sidenav-content/sidenav-content.component";
import { SidenavHeaderComponent } from './components/sidenav-header/sidenav-header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'ek-main',
  imports: [CommonModule, RouterOutlet, MatSidenavModule, MatListModule, SidenavContentComponent, SidenavHeaderComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {
  readonly _sidenavService = inject(SidenavService);
  readonly initialSidenavItems = this._sidenavService.sidenavItems;

  collapsed = signal(false);
  sidenavWidth = computed(() => (this.collapsed() ? '65px' : '250px')); 

  items = this.initialSidenavItems;

  isCollapsed = false;

  ngOnInit(): void {
  }
}
