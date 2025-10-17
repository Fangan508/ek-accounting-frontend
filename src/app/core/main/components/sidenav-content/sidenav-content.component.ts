import { Component, computed, inject, Input, OnInit, signal } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { SidenavService } from '../../services/sidenav.service';
import { MatIcon } from '@angular/material/icon';
import { SidenavItemModel } from '../../models/sidenav-item.model';
import { Router } from '@angular/router';

@Component({
  selector: 'ek-sidenav-content',
  imports: [MatListModule, MatIcon],
  templateUrl: './sidenav-content.component.html',
  styleUrl: './sidenav-content.component.scss'
})
export class SidenavContentComponent implements OnInit {
  readonly _router = inject(Router);
  readonly _sidenavService = inject(SidenavService);
  readonly _sidenavCollapsed = signal(false);

  @Input() set collapsed(value: boolean) {
    this._sidenavCollapsed.set(value);
  }

  readonly initialSidenavItems = this._sidenavService.sidenavItems;
  profilePicSize = computed(() => this._sidenavCollapsed() ? '32' : '100');

  items = this.initialSidenavItems;

  ngOnInit(): void {

  }

  toggle() {
    this._sidenavCollapsed.set(!this._sidenavCollapsed());
  }

  onMatListItemClick(sidenavItem: SidenavItemModel) {
    const path = sidenavItem.path;

    if (path) {
      this._router.navigate([path]);
    }
  }

  isActive(route: string | undefined): boolean {
    return this._router.url === route;
  }
}