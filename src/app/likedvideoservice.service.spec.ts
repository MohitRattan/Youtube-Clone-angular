import { TestBed } from '@angular/core/testing';

import { LikedvideoserviceService } from './likedvideoservice.service';

describe('LikedvideoserviceService', () => {
  let service: LikedvideoserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LikedvideoserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
