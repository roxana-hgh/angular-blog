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
  form!: FormGroup ;
  blog!: Blog;
  id!: number;

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
      this.formGenerator(null)
    }
    console.log(this.form);

        
          let fd = new FormData();
          console.log(fd);
        
    
  }

  private captureIdFromURL() {
    // get id form url (if there is id so we update specific blog with that id
    // and if there is no id so we create the blog)

    return Number(this.route.snapshot.paramMap.get('id'));
  }

  private getBlog(id: number) {
    // use blog service to get blog with the id in argument
    // then we generate a form with that blog data

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
   console.log(fd);
   

    }
    
  }
}
