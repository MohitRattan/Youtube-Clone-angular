import { Component, ViewChild, Renderer2, Inject, EventEmitter, Output } from '@angular/core';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { CommonModule, DOCUMENT } from '@angular/common';
import { ThemeServiceService } from '../../theme-service.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SignupComponent } from '../../signup/signup.component';
import { SearchService } from '../../search.service';
import { FormsModule } from '@angular/forms';
import { FileUploaderComponent } from '../../file-uploader/file-uploader.component';
import { UploadVideoComponent } from '../../upload-video/upload-video.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [SidenavComponent, CommonModule, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  @ViewChild(SidenavComponent) sidenav!: SidenavComponent;
  @Output() search = new EventEmitter<string>();


  searchQuery: string = '';
  private searchService = Inject(SearchService);
  brandImageUrl: string = 'https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg';
  brandiconUrl: string = 'https://static.vecteezy.com/system/resources/previews/021/079/672/non_2x/user-account-icon-for-your-design-only-free-png.png';

  isDropdownOpen: boolean = false;
  isDropdownOpen1: boolean = false;
  isDarkTheme: boolean = false;
searchText: any;

  constructor(
    private themeService: ThemeServiceService,
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private router: Router,
    private modalService: NgbModal // Inject NgbModal service
  ) {}

  ngOnInit(): void {
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
      if (isDark) {
        this.renderer.setStyle(this.document.body, 'background-color', 'black');
        this.brandImageUrl = 'https://9to5mac.com/wp-content/uploads/sites/6/2017/08/youtube_logo_dark.jpg?quality=82&strip=all';
        this.brandiconUrl = 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg';
      } else {
        this.renderer.setStyle(this.document.body, 'background-color', 'white');
        this.brandImageUrl = 'https://cdn.mos.cms.futurecdn.net/8gzcr6RpGStvZFA2qRt4v6.jpg';
        this.brandiconUrl = 'https://static.vecteezy.com/system/resources/previews/021/079/672/non_2x/user-account-icon-for-your-design-only-free-png.png';
      }
    });
  }
  onSearch(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      this.searchService.setSearchQuery(this.searchQuery); // Update search query in the service
      console.log('Search query:', this.searchQuery);
    }
  }

  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme;
    this.themeService.toggleTheme(this.isDarkTheme);
  }

  onSearchInput(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    this.searchQuery = inputElement.value;
  }

  onSearchSubmit(event: Event): void {
    event.preventDefault();
    if (this.searchQuery.trim()) {
      console.log('Search query:', this.searchQuery);
    }
  }

  toggleSidenav() {
    this.sidenav.toggleSidenav();
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleDropdown1() {
    this.isDropdownOpen1 = !this.isDropdownOpen1;
  }

  inLoginPage(): boolean {
    return this.router.url === '/login';
  }

  insignup(): boolean {
    return this.router.url === '/signUp';
  }

  onLogin() {
    this.router.navigate(['home']);
  }

  logout(): void {
    this.router.navigate(['/login']);
  }

  redirectToSignup(): void {
    this.router.navigate(['/signup']); 
  }
  uploadVideo() {
   this.modalService.open(FileUploaderComponent,{centered:true})
  }
  
  liveVideo() {
   this.modalService.open(UploadVideoComponent,{centered:true})
  }
}
