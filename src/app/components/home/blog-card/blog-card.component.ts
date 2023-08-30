import { Component, Input, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-card',
  templateUrl: './blog-card.component.html',
  styleUrls: ['./blog-card.component.css'],
})
export class BlogCardComponent implements OnInit {
  @Input() id!: number; 
  blog!: Blog;
  

  constructor(private blogsService: BlogsService) {}

  ngOnInit(): void {
    this.blogsService.get_blog(this.id).subscribe((blog) => {
      this.blog = blog;
    });
  }
}
