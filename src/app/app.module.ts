import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbPopoverModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { environment } from '../environments/environment';


import { SanitizedHtmlPipe } from './pipes/sanitized-html.pipe';
import { ToastComponent } from './components/shared/toast/toast.component';
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
import { ConfirmDeleteComponent } from './modals/confirm-delete/confirm-delete.component';
import { SearchComponent } from './components/search/search.component';
import { DashbordComponent } from './components/admin/dashbord/dashbord.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { MenuFormComponent } from './modals/menu-form/menu-form/menu-form.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './components/auth/auth.guard';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';


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
    SearchComponent,
    DashbordComponent,
    MenuComponent,
    ConfirmDeleteComponent,
    SanitizedHtmlPipe,
    MenuFormComponent,
    LoginComponent,
    NotFoundComponent,
    SignUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    NgbPopoverModule,
    ReactiveFormsModule,
    FontAwesomeModule,
    CKEditorModule,
    ToastComponent,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideStorage(() => getStorage()),
    provideFirestore(() => getFirestore()),
  ],
  exports: [
    SanitizedHtmlPipe
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
