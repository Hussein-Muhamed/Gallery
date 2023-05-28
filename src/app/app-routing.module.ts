import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { LandingComponent } from './Components/landing/landing.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { EditeComponent } from './Components/edite/edite.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { HomeComponent } from './Components/home/home.component';
import { PhotosComponent } from './Components/photos/photos.component';
import { AddComponent } from './Components/add/add.component';
import { ErrorComponent } from './Components/error/error.component';
import { RemoveComponent } from './Components/remove/remove.component';
import { AboutComponent } from './Components/about/about.component';
import { authGuard } from './Guards/auth.guard'

const routes: Routes = [
  { path: '', component: WelcomeComponent , canActivate:[authGuard]},
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'landing', component: LandingComponent,children:[
        { path: 'edite/:id', component: EditeComponent },
        { path:'delete/:id',component: RemoveComponent},
      ] },
      {
        path: 'Profile',
        component: ProfileComponent,
        children: [
          { path: 'Album/:id', component: AlbumsComponent },
          { path: 'Photos/:id', component: PhotosComponent },
        ],
      },
      { path: 'aboutUs', component:AboutComponent},
    ],
  },
  { path: '**',  component: ErrorComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
