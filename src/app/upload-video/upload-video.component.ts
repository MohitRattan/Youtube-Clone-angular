import { Component } from '@angular/core';

@Component({
  selector: 'app-upload-video',
  standalone: true,
  imports: [],
  templateUrl: './upload-video.component.html',
  styleUrl: './upload-video.component.css'
})
export class UploadVideoComponent {
  private stream: MediaStream | null = null;

  ngOnInit(): void {
    this.initializeCamera();
  }

  private async initializeCamera() {
    try {
      const constraints = {
        video: { facingMode: 'user' } // Front camera
      };
      this.stream = await navigator.mediaDevices.getUserMedia(constraints);
      const video = document.getElementById('cam') as HTMLVideoElement;
      video.srcObject = this.stream;
      video.play();
    } catch (err) {
      console.error('Error accessing camera: ', err);
    }
  }

  switchCamera(isFront: boolean) {
    const constraints = {
      video: { facingMode: isFront ? 'user' : 'environment' }
    };
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
    }
    navigator.mediaDevices.getUserMedia(constraints).then(stream => {
      const video = document.getElementById('cam') as HTMLVideoElement;
      video.srcObject = stream;
      video.play();
      this.stream = stream;
    }).catch(err => console.error('Error switching camera: ', err));
  }

  snapPhoto() {
    const video = document.getElementById('cam') as HTMLVideoElement;
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const context = canvas.getContext('2d');
    const photo = document.getElementById('photo') as HTMLImageElement;

    if (context) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      photo.src = canvas.toDataURL('image/png');
    }
  }
}