import { Component, OnInit } from '@angular/core';
import { DownloadVideoService } from '../download-video.service';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-downloads',
  standalone: true,
  imports: [YouTubePlayerModule, CommonModule],
  templateUrl: './downloads.component.html',
  styleUrls: ['./downloads.component.css']
})
export class DownloadsComponent implements OnInit {
  isLoggedIn: boolean;
  downloadedVideos: { [video_url: string]: string[] } = {};

  constructor(private downloadVideoService: DownloadVideoService,private authService: AuthServiceService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }
  

  ngOnInit(): void {
    this.downloadVideoService.getDownloadVideos().subscribe({
      next: (data) => {
        this.downloadedVideos = data;
        console.log('Downloaded Videos:', this.downloadedVideos);
      },
      error: (error) => console.error('Failed to fetch downloaded videos', error)
    });
  }

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  }

  private extractVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  }

  playVideo(videoUrl: string) {
    // Implement play video functionality here
    console.log('Playing video:', videoUrl);
    
  }
}

