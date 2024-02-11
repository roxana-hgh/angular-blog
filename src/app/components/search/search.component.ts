import { Component, OnInit } from '@angular/core';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {

  filteredBlogs: Blog[] = [];
  blogsList!: Blog[]
  searchActive: boolean = false

  constructor(
    private blogsService: BlogsService,
  ) {}

  ngOnInit(): void {

    this.blogsService.get_all_blogs().subscribe((blogs) => {
      this.blogsList = blogs;
    });
    
    this.filteredBlogs = this.blogsList;
  }

  searchblogs(q: string){
    if (!q) {
      this.filteredBlogs = this.blogsList;
      return;
    }
    this.searchActive = true
    this.filteredBlogs = this.blogsList.filter(
      blog => blog?.title.toLowerCase().includes(q.toLowerCase())
    );
    console.log(this.filteredBlogs);
    
  }

}
