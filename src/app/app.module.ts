import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './components/header/header.component';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { AllBlogsComponent } from './components/home/all-blogs/all-blogs.component';
import { SideComponent } from './components/home/side/side.component';
import { BlogCardComponent } from './components/home/blog-card/blog-card.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseComponent,
    HomeComponent,
    AllBlogsComponent,
    SideComponent,
    BlogCardComponent,
    SingleBlogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
