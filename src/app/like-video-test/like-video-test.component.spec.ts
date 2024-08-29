import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LikeVideoTestComponent } from './like-video-test.component';

describe('LikeVideoTestComponent', () => {
  let component: LikeVideoTestComponent;
  let fixture: ComponentFixture<LikeVideoTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LikeVideoTestComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LikeVideoTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
