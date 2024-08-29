import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LikedvideoserviceService {
  private apiUrl = 'https://localhost:7299/api/likevideos';
  private likedVideos: string[] = [];

  constructor(private http: HttpClient) { }
  
  savelikedvideos(liked_video: string): Observable<any> {
    return this.http.post(this.apiUrl, { liked_video });
  }

  getlikevideos(): Observable<{[liked_video: string]: string[] }> {
    return this.http.get<{liked_video: string }[]>(this.apiUrl).pipe(
      map(videos =>
        videos.reduce((acc, video) => {
          const videoId = this.extractVideoId(video.liked_video);
          if (videoId) {
            acc[video.liked_video] = [videoId];
          }
          return acc;
        }, {} as { [liked_video: string]: string[] })
      ),
      catchError(this.handleError)
    );
  }
  removelikedvideo(videoUrl: string): Observable<void> {
    const index = this.likedVideos.indexOf(videoUrl);
    if (index > -1) {
      this.likedVideos.splice(index, 1);
    }
    return of(); // Simulate successful removal
  }
  private extractVideoId(url: string): string {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
