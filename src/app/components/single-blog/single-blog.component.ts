import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { Tag } from 'src/app/interfaces/tag';
import { BlogsService } from 'src/app/services/blogs.service';
import { TagsService } from 'src/app/services/tags.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faTag } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-single-blog',
  templateUrl: './single-blog.component.html',
  styleUrls: ['./single-blog.component.css'],
})
export class SingleBlogComponent implements OnInit {
  blog!: Blog;
  id!: number;
  blog_Tags: Tag[] = [];
  faTag = faTag;

  constructor(
    private blogsService: BlogsService,
    private route: ActivatedRoute,
    private tagsService: TagsService
  ) {}

  ngOnInit(): void {
        this.route.params.subscribe((params: Params) => {
          this.id = +params['id'];
          this.blogsService.get_blog(this.id).subscribe((blog) => {
            this.blog = blog;
            this.blog.tags?.forEach((t:any)=>{
              this.tagsService.get_Tag(t).subscribe((tag:any)=> {
                this.blog_Tags.push({id: tag.id, title: tag.title})
                console.log(tag);
                console.log(this.blog_Tags);
              })
            })
            
          });
        });

       
        
        
  
  }

  

}
