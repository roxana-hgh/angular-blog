import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogListsComponent } from './components/admin/blog-lists/blog-lists.component';
import { AddEditBlogComponent } from './components/admin/add-edit-blog/add-edit-blog.component';
import { DashbordComponent } from './components/admin/dashbord/dashbord.component';
import { MenuComponent } from './components/admin/menu/menu.component';
import { LoginComponent } from './components/auth/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './components/auth/auth.guard';
import { SignUpComponent } from './components/auth/sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog/:id', component: SingleBlogComponent },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: '', component: DashbordComponent },
      { path: 'blogs', component: BlogListsComponent },
      { path: 'add-blog', component: AddEditBlogComponent },
      { path: 'edit-blog/:id', component: AddEditBlogComponent },
      { path: 'menus', component: MenuComponent },
    ],
  },
  { path: 'register', component: SignUpComponent },
  { path: 'login', component: LoginComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
