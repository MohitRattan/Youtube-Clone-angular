import { Component, OnInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import GLightbox from 'glightbox';
import { Observable } from 'rxjs';
import { VideoService } from '../Services/video.service';
import { CommonModule } from '@angular/common';
import { LikedvideoserviceService } from '../likedvideoservice.service';
import { DownloadVideoService } from '../download-video.service';
import { ThemeServiceService } from '../theme-service.service';

export interface Video {
  title: string;
  thumbnail: string;
  description?: string;
  logoUrl?: string;
  isPlaying?: boolean;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  logoUrl: string = ''; // Change to a single string
  videos$: Observable<Video[]>;
  videoData: Video[] = [];
  showingCategoryVideos = false;
  showingAllVideos = true;
  categorizedVideos: { [title: string]: string[] } = {};
  currentVideos: Video[] = [];
  categories: string[] = [];
  allVideos: Video[] = [];
  private lightbox: any;
  currentTheme: string = 'light-theme'; // Default theme
  isDarkTheme: boolean = false; // Flag to track theme

  constructor(
    private sanitizer: DomSanitizer,
    private videoService: VideoService,
    private likedVideoService: LikedvideoserviceService,
    private downloadVideoService: DownloadVideoService,
    private themeService: ThemeServiceService // Inject the ThemeService
  ) {
    this.videos$ = this.videoService.getVideosByThumbnail();
  }

  ngOnInit(): void {
    this.videos$.subscribe({
      next: (data) => {
        this.videoData = data.map(video => ({ ...video, isPlaying: false }));
        this.allVideos = [...this.videoData];
        this.currentVideos = [...this.allVideos];
        this.fetchVideoData();
      },
      error: (error) => console.error('Failed to fetch video data', error)
    });
    
    // Subscribe to theme changes
    this.themeService.isDarkTheme$.subscribe(isDark => {
      this.isDarkTheme = isDark;
      this.currentTheme = isDark ? 'dark-theme' : 'light-theme';
    });
  }
  
  ngAfterViewInit(): void {
    if (!this.lightbox) {
      this.lightbox = GLightbox({
        selector: '.glightbox'
      });
    }
  }

  extractVideoId(url: string): string | null {
    const regex = /(?:https?:\/\/)?(?:www\.)?youtube\.com\/watch\?v=([a-zA-Z0-9_-]{11})|youtu\.be\/([a-zA-Z0-9_-]{11})/;
    const match = url.match(regex);
    return match ? match[1] || match[2] : null;
  }

  getThumbnailUrl(videoUrl: string): string {
    const videoId = this.extractVideoId(videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  }

  getSafeUrl(thumbnailUrl: string): SafeResourceUrl {
    const videoId = this.extractVideoId(thumbnailUrl);

    if (videoId) {
      const url = `https://www.youtube.com/embed/${videoId}`;
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } else {
      console.error('Invalid video ID');
      return this.sanitizer.bypassSecurityTrustResourceUrl('');
    }
  }

  playVideo(video: Video) {
    this.videoData.forEach(v => v.isPlaying = v === video);
  }

  fetchVideoData() {
    this.videoService.getVideosByTitle().subscribe({
      next: (data) => {
        this.categorizedVideos = data;
        this.categories = Object.keys(data);
        if (!this.showingCategoryVideos) {
          this.currentVideos = [...this.allVideos];
        }
        console.log('Categorized Videos:', this.categorizedVideos);
        console.log('Categories:', this.categories);
      },
      error: (error) => console.error('Failed to fetch categorized video data', error)
    });
  }

  showAllVideos() {
    this.currentVideos = [...this.allVideos];
    this.showingCategoryVideos = false;
    this.showingAllVideos = true;
  }

  showCategoryVideos(category: string) {
    console.log('Selected Category:', category);
    
    const videoIds = this.categorizedVideos[category] || [];

    this.currentVideos = this.allVideos.filter(video => {
      const videoId = this.extractVideoId(video.thumbnail);
      return videoId && videoIds.includes(videoId);
    });

    console.log('Filtered Videos:', this.currentVideos);

    this.showingAllVideos = false;
    this.showingCategoryVideos = true;
  }

  likeVideo(video: Video) {
    if (video.thumbnail) {
      const videoId = this.extractVideoId(video.thumbnail);
      if (videoId) {
        this.likedVideoService.savelikedvideos(video.thumbnail).subscribe({
          next: () => console.log('Video liked successfully'),
          error: (error) => console.error('Failed to like video', error)
        });
      }
    }
  }

  downloadVideo(video: Video) {
    if (video.thumbnail) {
      this.downloadVideoService.saveVideoUrl(video.thumbnail).subscribe({
        next: () => console.log('Video download information saved successfully'),
        error: (error) => console.error('Failed to save video download information', error)
      });
    }
  }
}
