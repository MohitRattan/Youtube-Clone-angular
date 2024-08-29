import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ThemeServiceService } from '../../theme-service.service';
import { AuthServiceService } from '../../auth-service.service'; 
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {
  isSidenavOpen = true;
  isExpanded = true;
  isDarkTheme = false;
  private themeSubscription: Subscription = new Subscription();

  constructor(
    private router: Router,
    private themeService: ThemeServiceService,
    public authService: AuthServiceService  
  ) { }

  ngOnInit(): void {
    this.themeSubscription = this.themeService.isDarkTheme$.subscribe(isDarkTheme => {
      this.isDarkTheme = isDarkTheme;
      this.updateTheme();
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe(); // Prevent memory leaks
  }

  toggleSidenav() {
    this.isSidenavOpen = !this.isSidenavOpen;
    this.isExpanded = this.isSidenavOpen;
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme); // Update the service
    this.updateTheme();
  }

  updateTheme(): void {
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }

  navigate(route: string) {
    if (this.authService.isLoggedIn() || route === '/like' || route === '/download') {
      this.router.navigate([route]);
    } else {
      this.router.navigate(['/signup']); 
    }
  }
  
  checkAuthenticationAndNavigate(route: string): void {
    if (this.authService.isLoggedIn()) {
      console.log('User is logged in. Navigating to:', route);
      this.router.navigate([route]);
    } else {
      console.log('User is not logged in. Redirecting to login.');
      this.router.navigate(['/signup']);
    }
  }
}
