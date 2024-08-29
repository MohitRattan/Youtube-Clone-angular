import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShortsService {

  private apiUrl = 'https://localhost:7299/api/shorts';

  constructor(private http: HttpClient) { }
  getShorts(): Observable<string[]> {
    return this.http.get<{ title: string, thumbnail: string }[]>(this.apiUrl).pipe(
      map(videos => videos.map(video => this.extractShortsID(video.thumbnail))),
      catchError(this.handleError)
    );
  }

  // Extract Shorts video ID from the URL
  private extractShortsID(url: string): string {
    const videoIdMatch = url.match(/\/shorts\/([^\/?&]+)/);  // Regex to extract the ID from a Shorts URL
    return videoIdMatch ? videoIdMatch[1] : '';
  }
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error.message);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }
}
  