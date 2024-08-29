import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LikedvideoComponent } from './likedvideo/likedvideo.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { DownloadsComponent } from './downloads/downloads.component';
import { ShortsComponent } from './shorts/shorts.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'download', component: DownloadsComponent },
  { path: 'like', component:LikedvideoComponent },
  { path: 'signup', component: SignupComponent },
  {path:'shorts',component:ShortsComponent},
  {path:'login',component:LoginComponent},
  
  // Add other routes here
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];