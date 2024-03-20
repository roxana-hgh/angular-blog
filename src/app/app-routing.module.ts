import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { SingleBlogComponent } from './components/single-blog/single-blog.component';
import { AdminComponent } from './components/admin/admin.component';
import { BlogListsComponent } from './components/admin/blog-lists/blog-lists.component';
import { AddEditBlogComponent } from './components/admin/add-edit-blog/add-edit-blog.component';
import { DashbordComponent } from './components/admin/dashbord/dashbord.component';
import { MenuComponent } from './components/admin/menu/menu.component';


const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'blog/:id', component: SingleBlogComponent },
  { path: 'admin', component: AdminComponent, children: [
    { path: '', component: DashbordComponent },
    { path: 'blogs', component: BlogListsComponent },
    { path: 'add-blog', component: AddEditBlogComponent },
    { path: 'edit-blog/:id', component: AddEditBlogComponent },
    { path: 'menus', component: MenuComponent }
  ]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
