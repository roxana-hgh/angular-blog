import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-all-blogs',
  templateUrl: './all-blogs.component.html',
  styleUrls: ['./all-blogs.component.css'],
})
export class AllBlogsComponent implements OnInit {
  blogs!: Blog[];

  constructor(private blogsService: BlogsService) {}
 
  ngOnInit(): void {
    this.blogsService.get_all_blogs().subscribe((blogs) => {
      this.blogs = blogs; 
     
    });
  }

}
