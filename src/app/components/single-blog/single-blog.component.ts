import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  blog!: Blog;
  id!: number;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
          this.id = +params['id'];
          this.blogsService.get_blog(this.id).subscribe((blog) => {
            this.blog = blog;
          });
        });
  
  }

  

}
