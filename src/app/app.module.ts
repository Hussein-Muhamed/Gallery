import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './Components/welcome/welcome.component';
import { HeaderComponent } from './Components/header/header.component';
import { LandingComponent } from './Components/landing/landing.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { AlbumsComponent } from './Components/albums/albums.component';
import { PhotosComponent } from './Components/photos/photos.component';
import { AddComponent } from './Components/add/add.component';
import { EditeComponent } from './Components/edite/edite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './Components/footer/footer.component';
import { ErrorComponent } from './error/error.component';
import { HomeComponent } from './Components/home/home.component';
import { RemoveComponent } from './Components/remove/remove.component';
import { AboutComponent } from './Components/about/about.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeaderComponent,
    LandingComponent,
    ProfileComponent,
    AlbumsComponent,
    PhotosComponent,
    AddComponent,
    EditeComponent,
    FooterComponent,
    ErrorComponent,
    HomeComponent,
    RemoveComponent,
    AboutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
