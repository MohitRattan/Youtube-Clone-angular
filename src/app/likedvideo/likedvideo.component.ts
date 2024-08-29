import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { LikedvideoserviceService } from '../likedvideoservice.service';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-likedvideo',
  standalone: true,
  imports: [YouTubePlayerModule, CommonModule],
  templateUrl: './likedvideo.component.html',
  styleUrls: ['./likedvideo.component.css']
})
export class LikedvideoComponent implements OnInit {
  likedVideos: { [liked_video: string]: string[] } = {};

  constructor(private likedVideoService: LikedvideoserviceService) {}

  ngOnInit(): void {
    this.likedVideoService.getlikevideos().subscribe({
      next: (data) => {
        this.likedVideos = data;
        console.log('Liked Videos:', this.likedVideos);
      },
      error: (error) => console.error('Failed to fetch liked videos', error)
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
//   isOpen: boolean = true; 
//   likedVideos: string[] = []; 

//   constructor(
//     private likedVideoService: LikedvideoserviceService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit(): void {
//     this.loadLikedVideos();
//   }

//   loadLikedVideos(): void {
//     this.likedVideoService.getlikevideos().subscribe({
//       next: (videos) => {
//         this.likedVideos = Object.values(videos).flat(); 
//       },
//       error: (error) => console.error('Error loading liked videos:', error)
//     });
//   }

//   openModal(): void {
//     this.isOpen = true;
//   }

//   closeModal(): void {
//     this.isOpen = false;
//   }

//   getSafeUrl(videoId: string): SafeResourceUrl {
//     const url = `https://www.youtube.com/embed/${videoId}`;
//     return this.sanitizer.bypassSecurityTrustResourceUrl(url);
//   }
// }
