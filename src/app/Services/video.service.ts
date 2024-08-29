import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
export interface Video {
  id: string;
  url: string;
}
@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private apiUrl = 'https://localhost:7299/api/Videos';

  constructor(private http: HttpClient) { }
  downloadVideo(videoUrl: string): Observable<any> {
    return this.http.post(this.apiUrl, { url: videoUrl });
  }

  getVideos(): Observable<string[]> {
    return this.http.get<{ title: string, thumbnail: string }[]>(this.apiUrl).pipe(
      map(videos => videos.map(video => this.extractVideoId(video.thumbnail))),
      catchError(this.handleError)
    );
  }

  getVideosByTitle(): Observable<{ [title: string]: string[] }> {
    return this.http.get<{ title: string, thumbnail: string }[]>(this.apiUrl).pipe(
      map(videos => {
        const categorizedVideos: { [Title: string]: string[] } = {};
        console.log(categorizedVideos);
        videos.forEach(video => {
          const videoId = this.extractVideoId(video.thumbnail);

          if (!categorizedVideos[video.title]) {
            categorizedVideos[video.title] = [];
          }

          categorizedVideos[video.title].push(videoId);

        });

        return categorizedVideos;

      }),
      catchError(this.handleError)
    );
  }

  private extractVideoId(url: string): string {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch ? videoIdMatch[1] : '';
  }

  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
  getVideosByThumbnail(): Observable<{ title: string, thumbnail: string }[]> {
    return this.http.get<{ title: string, thumbnail: string }[]>(this.apiUrl).pipe(
      map(videos => videos.map(video => ({
        title: video.title,
        thumbnail: video.thumbnail 
      }))),
      catchError(this.handleError)
    );
  }
  
}
