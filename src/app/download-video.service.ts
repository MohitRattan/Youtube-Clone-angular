import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DownloadVideoService {
  private apiUrl = 'https://localhost:7299/api/DownloadVideos'; // Ensure this URL is correct

  constructor(private http: HttpClient) { }

  saveVideoUrl(video_url: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}`, { video_url }).pipe(
      catchError(this.handleError)
    );
  }
  
  getDownloadVideos(): Observable<{[video_url: string]: string[] }> {
    return this.http.get<{video_url: string }[]>(this.apiUrl).pipe(
      map(videos =>
        videos.reduce((acc, video) => {
          const videoId = this.extractVideoId(video.video_url);
          if (videoId) {
            acc[video.video_url] = [videoId];
          }
          return acc;
        }, {} as { [video_url: string]: string[] })
      ),
      catchError(this.handleError)
    );
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
