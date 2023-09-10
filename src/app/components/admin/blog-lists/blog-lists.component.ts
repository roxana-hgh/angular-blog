import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {  Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';
import { R3SelectorScopeMode } from '@angular/compiler';

@Component({
  selector: 'app-blog-lists',
  templateUrl: './blog-lists.component.html',
  styleUrls: ['./blog-lists.component.css'],
})
export class BlogListsComponent implements OnInit {
  blogs!: Blog[];
  selected: number = 0;

  constructor(
    private blogsService: BlogsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogsService.get_all_blogs().subscribe((blogs) => {
      this.prepareBlogs(blogs);
      this.blogs = blogs;
    });
  }

  private prepareBlogs(blogs: any[]) {
    // each blog has a property named check: true if check in table and false for uncheck
    // it use for do action on group blogs

    blogs.map((blog: { check: boolean }) => {
      blog.check = false;
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

  toggleAllSelect(event: any) {
    this.blogs.map(blog => {
      blog.check = event.target.checked
    })
    
  }

  // ToDo:
  //   get selected id
  //   get selected title
  //   delete selected
  //   show modal base on message

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }
  delete(id: number) {
    this.blogsService.delete_Blog(id).subscribe(() => {
      this.router.navigate(['admin']);
    });
  }
}


