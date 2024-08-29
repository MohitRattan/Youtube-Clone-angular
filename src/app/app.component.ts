import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { SidenavComponent } from "./Components/sidenav/sidenav.component";
import { DownloadsComponent } from "./downloads/downloads.component";
import { HomeComponent } from './home/home.component';
import { FileUploaderComponent } from "./file-uploader/file-uploader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, SidenavComponent, DownloadsComponent, HomeComponent, FileUploaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'youtube_Version_dev_2';
  
}
