import { TestBed } from '@angular/core/testing';

import { DownloadVideoService } from './download-video.service';

describe('DownloadVideoService', () => {
  let service: DownloadVideoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DownloadVideoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
