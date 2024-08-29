import { Component, OnInit } from '@angular/core';
import { ShortsService } from '../shorts.service';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-shorts',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './shorts.component.html',
  styleUrls: ['./shorts.component.css']
})
export class ShortsComponent implements OnInit {
  videoIds: string[] = [];
  safeVideoUrls: SafeResourceUrl[] = [];
  likeCount: any;
  dislikeCount: any;

  constructor(private shortsService: ShortsService, private domSanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.shortsService.getShorts().subscribe(
      (ids: string[]) => {
        this.videoIds = ids;
        this.safeVideoUrls = this.videoIds.map(id => this.getSafeVideoUrl(id));  // Convert to safe URLs
      },
      (error) => {
        console.error('Error fetching shorts:', error);
      }
    );
  }

  getSafeVideoUrl(videoId: string): SafeResourceUrl {
    const url = `https://www.youtube.com/embed/${videoId}?autoplay=0`;
    return this.domSanitizer.bypassSecurityTrustResourceUrl(url);  
  }
   likeVideo(): void {
    this.likeCount++;
    console.log('Liked! Total likes:', this.likeCount);
  }

  dislikeVideo(): void {
    this.dislikeCount++;
    console.log('Disliked! Total dislikes:', this.dislikeCount);
  }
}
