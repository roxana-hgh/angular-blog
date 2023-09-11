import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',
  styleUrls: ['./add-edit-blog.component.css'],
})
export class AddEditBlogComponent implements OnInit {
  form!: FormGroup;
  blog!: Blog;
  id!: number;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    let id = this.captureIdFromURL();
    this.id = id
    if (this.id) {
      this.getBlog(this.id);
      this.formGenerator(this.blog);
    
      
    } else {
      this.formGenerator(null);
    }
   
  }

  private captureIdFromURL() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  private getBlog(id: number) {
    this.blogService.get_blog(id).subscribe((blog) => {
      if (blog) {
        this.blog = blog;
         this.formGenerator(this.blog);
      }
    });
  }

  

  private formGenerator(blog: Blog | null) {
    this.form = new FormGroup({
      id: new FormControl(blog ? blog.id : null),
      title: new FormControl(blog ? blog.title : '', Validators.minLength(3)),
      description: new FormControl(
        blog ? blog.description : '',
        Validators.maxLength(100000)
      ),
      image: new FormControl(blog ? blog.image : ''),
      date: new FormControl(blog ? blog.date : new Date()),
    });
  }
  
  // TODO:
  // add form validator 

  
  save() {
    if (this.form?.valid) {
      if (this.blog) {
        this.blogService
          .update_Blog(this.id, this.form.value)
          .subscribe((blog) => {
            console.log(blog);
            console.log('updated');
          });
        
      } else {
        this.blogService.add_blog(this.form.value).subscribe((blog) => {
        console.log(blog);

          console.log('added');
          this.router.navigate(['home'])
        });
      }
    }
  }
}
