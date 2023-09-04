import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


import { HeaderComponent } from './components/header/header.component';
import { BaseComponent } from './components/base/base.component';
import { HomeComponent } from './components/home/home.component';
import { AllBlogsComponent } from './components/home/all-blogs/all-blogs.component';
import { SideComponent } from './components/home/side/side.component';
import { BlogCardComponent } from './components/home/blog-card/blog-card.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AdminComponent } from './components/admin/admin.component';
import { AddEditBlogComponent } from './components/admin/add-edit-blog/add-edit-blog.component';
import { BlogListsComponent } from './components/admin/blog-lists/blog-lists.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BaseComponent,
    HomeComponent,
    AllBlogsComponent,
    SideComponent,
    BlogCardComponent,
    SingleBlogComponent,
    AdminComponent,
    AddEditBlogComponent,
    BlogListsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
