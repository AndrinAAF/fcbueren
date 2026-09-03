import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  imports: [RouterLink, RouterLinkActive, CommonModule],
  selector: 'app-navbar',
  styleUrl: './navbar.css',
  templateUrl: './navbar.html',
})
export class Navbar {
  isMenuOpen = false;
  isSearchOpen = false;

  @ViewChild('searchContainer') searchContainer!: ElementRef;

  toggleMenu() { this.isMenuOpen = !this.isMenuOpen; }
  
  toggleSearch(event?: Event) { 
    if (event) {
        event.stopPropagation();
    }
    this.isSearchOpen = !this.isSearchOpen; 
  }

  @HostListener('document:click', ['$event'])
  clickout(event: Event) {
    if (this.isSearchOpen && this.searchContainer && !this.searchContainer.nativeElement.contains(event.target)) {
      this.isSearchOpen = false;
    }
  }
}
