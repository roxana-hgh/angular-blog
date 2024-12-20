import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {  Router, ActivatedRoute, Params } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';
import { ConfirmDeleteComponent } from 'src/app/modals/confirm-delete/confirm-delete.component';


@Component({
  selector: 'app-blog-lists',
  templateUrl: './blog-lists.component.html',
  styleUrls: ['./blog-lists.component.css'],
})
export class BlogListsComponent implements OnInit {
  blogs!: Blog[];
  checksToggle: boolean = false;
  selected: number = 0;
  sortAZ: boolean = false;
  sortZA: boolean = false;

  constructor(
    private blogsService: BlogsService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit(): void {
    this.blogsService.get_all_blogs().subscribe((blogs) => {
      this.prepareBlogs(blogs);
      this.blogs = blogs;
    });

   
    

  }
  private prepareBlogs(blogs: any[]) {
    // each blog has a property named check: true if check in table and false for uncheck
    // it use for do action on group blogs

    blogs.map((blog: { check: boolean, date: Date }) => {
      blog.check = false;
      blog.date = new Date(blog.date);
      
    });
  }

  checkedCount() {
    // return number --> number of blogs which their check prop is true

    let count = 0;

    if (this.blogs)
      for (let blog of this.blogs) {
        if (blog.check) {
          count += 1;
        }
      }
    return count;
  }

  toggleAllSelect() {
    this.blogs.map((blog) => {
      blog.check = this.checksToggle;
    });
  }

  getCheckeds(): any {
    // return: list of blog --> return all blogs which their check prop is equal to true

    if (this.blogs)
      return this.blogs.filter((blog) => {
        if (blog.check) {
          return blog;
        }
        return null;
      });
  }

  private prepareBlogsTitle(blogs: any[]) {
    // arg: list of blogs
    // return: list of string which they are title of blogs
    // get title of each blog of blogs (arg) then return them as a list

    let list_of_titles: any[] = [];
    blogs.forEach((blog: { title: any }) => {
      list_of_titles.push(blog.title);
    });
    return list_of_titles;
  }

  private getBlogsIds(blogs: any[]) {
    // arg: blogs --> blog which we want their ids
    // return: list of blogs ids

    let id_list: any[] = [];
    blogs.forEach((blog: { id: any }) => {
      id_list.push(blog.id);
    });
    return id_list;
  }

   openConfirmDeleteModal() {
    // open deletion modal... if aprove then delete selected blogs

    // prepare checked blogs titles
    let checked_blogs = this.getCheckeds();
    let blogs_titles = this.prepareBlogsTitle(checked_blogs);

    // open modal
    let modal = this.modal.open(ConfirmDeleteComponent, {
      centered: true,
    });

    // set modal's input
    modal.componentInstance.deleted_objects_titles = blogs_titles;

    // on close modal
    modal.closed.subscribe(() => {
      this.deleteBlogs(checked_blogs);
    });
  }
  delete(id: number) {
    this.blogsService.delete_Blog(id).subscribe(() => {
      this.router.navigateByUrl('/admin/blogs');
    });
  }

  deleteBlogs(checked_blogs: Blog[]) {
    checked_blogs.forEach(blog => {
      console.log(blog.id);
      
      this.delete(blog.id)
    })
  }



  SortBy(e:any){
    const sortBy = e.target.id
    
    
    switch (sortBy) {
      case "Newest":
        this.blogs = this.blogs.sort((a, b) =>  b.date.getTime() - a.date.getTime())
        break
      case "A-Z":
        this.blogs = this.blogs.sort((a, b) => a.title.localeCompare(b.title))
        break
      case "Z-A":
        this.blogs = this.blogs.sort((a, b) => b.title.localeCompare(a.title))
        break
      default:
        this.blogs.sort((a, b) => a.date.getTime() - b.date.getTime());
    }
    
  }
 
 
}


