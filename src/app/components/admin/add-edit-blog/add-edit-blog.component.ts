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

  get blog_id() {
    return this.form?.get('id');
  }
  get title() {
    return this.form?.get('title');
  }
  get description() {
    return this.form?.get('description');
  }
  get image() {
    return this.form?.get('image');
  }

  get date() {
    return this.form?.get('Date');
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogsService
  ) {}

  ngOnInit(): void {
    this.id = this.captureIdFromURL();

    if (this.id) {
      this.getBlog(this.id);
    
      
    } else {
      this.formGenerator(null);
    }
    console.log(this.form);
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
      title: new FormControl(blog ? blog.title : '', [
        Validators.required,
        Validators.maxLength(250),
      ]),
      description: new FormControl(
        blog ? blog.description : '',
        Validators.maxLength(100000)
      ),
      Image: new FormControl(blog ? blog.image : ''),
      Date: new FormControl(blog ? blog.date : new Date()),
    });
  }

  save() {
    if (this.form?.valid) {
      let fd = new FormData();

      if (this.title?.value != (this.blog ? this.blog.title : '')) {
        fd.append('title', this.title?.value);
      }

       if (this.description?.value != (this.blog ? this.blog.description : '')) {
         fd.append('description', this.description?.value);
       }
      
      if (this.image?.value != (this.blog ? this.blog.image : '')) {
        fd.append('image', this.image?.value);
      }

      if (this.date?.value != (this.blog ? this.blog.date : '')) {
        fd.append('date', this.date?.value);
      }

      
      

      if (this.blog) {
        this.blogService
          .update_Blog(this.id, this.form.value)
          .subscribe((blog) => {
            console.log('updated');
          });
        
      } else {
        this.blogService.add_blog(this.form.value).subscribe((blog) => {
        
          console.log('added');
        });
      }


      
    }
  }
}
