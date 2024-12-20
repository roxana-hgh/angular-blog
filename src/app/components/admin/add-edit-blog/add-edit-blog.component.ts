import { Component, OnInit, SecurityContext } from '@angular/core';
import {
  FormGroup,
  FormArray,
  FormControl,
  Validators,
  FormBuilder,
  Form,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { DomSanitizer } from '@angular/platform-browser';

import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';
import { TagsService } from 'src/app/services/tags.service';
import { Tag } from 'src/app/interfaces/tag';

import { faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',

  styleUrls: ['./add-edit-blog.component.css'],
})
export class AddEditBlogComponent implements OnInit {
  Tagloader: boolean = false;
  imageloader: boolean = false;
  toast: boolean = false;
  faTimes = faTimes;
  form!: FormGroup;
  blog!: Blog;
  id!: number;
  tagform = this.fb.group({
    tagsArray: this.fb.array([]),
  });
  blog_tags: Tag[] = [];
  new_blog_tags: number[] = [];
  all_tags: Tag[] = [];
  filter_tags: Tag[] = this.all_tags;
  selectedTag: string = '';
  public Editor = DecoupledEditor;

  public onReady(editor: DecoupledEditor): void {
    const element = editor.ui.getEditableElement()!;
    const parent = element.parentElement!;

    parent.insertBefore(editor.ui.view.toolbar.element!, element);
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private blogService: BlogsService,
    private TagsService: TagsService,
    private sanitizer: DomSanitizer,
    private fb: FormBuilder
  ) {
    
  }

  sanitizeInput(value: any) {
    const sanitizedValue = this.sanitizer.sanitize(
      SecurityContext.HTML,
      value
    );
    const sanitizedValue1 = sanitizedValue ? sanitizedValue.toString() : '';
    console.log(sanitizedValue1);
    
  }

  get Tags() {
    return this.tagform.controls['tagsArray'] as FormArray;
  }

  addTagToForm(tag: Tag ) {
    if (tag) {
      const Tag_Form = this.fb.group({
        id: [tag.id],
        title: [tag.title, Validators.required],
      });
      return Tag_Form;
    } else {
      return
    }
  }

  deleteTag(TagIndex: number) {
    this.Tags.removeAt(TagIndex);
  }

  ngOnInit(): void {
    let id = this.captureIdFromURL();
    this.id = id;
    if (this.id) {
      this.getBlog(this.id);
      this.formGenerator(this.blog);
    } else {
      this.formGenerator(null);
    }
    this.get_all_tags();
    this.form.controls['title'].valueChanges.subscribe((value: any) => {
      this.sanitizeInput(value);
    });
  }

  private captureIdFromURL() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  private getBlog(id: number) {
    this.blogService.get_blog(id).subscribe((blog) => {
      if (blog) {
        this.blog = blog;
        //this.getBlogTags();
        this.formGenerator(this.blog);
        this.TagFormGenerator(this.blog);
      }
    });
  }


  private TagFormGenerator(model: Blog | null) {
    if (model != null && model.tags) {
      console.log('Model tags:', model.tags); // Log the model tags for debugging
      model.tags.map((t: number) => {
        // Log each tag for debugging
        this.TagsService.get_Tag(t).subscribe((tag: Tag) => {
          console.log('Tag:', tag);
       
          this.Tags.push(this.addTagToForm(tag));
        });
      });
    } else {
      let TagsForm = this.fb.group({
        id: [null],
        title: [''],
      });
      this.Tags.push(TagsForm);
    }
    console.log('Tags', this.Tags);
  }

  private formGenerator(blog: Blog | null) {
    this.form = new FormGroup({
      id: new FormControl(blog ? blog.id : null),
      title: new FormControl(blog ? blog.title : '', [
        Validators.minLength(3),
        Validators.required,
      ]),
      description: new FormControl(
        blog ? blog.description : '',
        Validators.maxLength(100000)
      ),
      tags: new FormArray([]),
      image: new FormControl(blog ? blog.image : ''),
      date: new FormControl(blog ? blog.date : new Date()),
    });
  }

  get_all_tags() {
    this.TagsService.get_all_Tags().subscribe((tags) => {
      this.all_tags = tags;
      this.filter_tags = tags;
    });
  }



  taginput(e: Event) {
    this.filter_tags = this.all_tags.filter((tag: any) =>
      tag.title.includes((e.target as HTMLInputElement).value)
    );
  }

  selectTag(t: any) {
    this.selectedTag = t.title;
  }
  addTagToList(e:Event) {
  
    e.stopPropagation()
    let all_tags_name = this.all_tags.map((t: any) => {
      return t.title;
    });

    let taginput: any = this.selectedTag;
    if (!all_tags_name.includes(taginput)) {
      this.Tagloader = true;
      this.TagsService.add_Tag({ id: null, title: taginput }).subscribe(
        (t: any) => {
          this.Tags.push(this.addTagToForm(t));
          this.Tagloader = false;
          this.toast = true;
          console.log('newtag added with service', t);
        }
      );
    } else {
      let existed_tag = this.all_tags.find((t) => t.title === taginput);

      if (existed_tag) {
        this.Tags.push(this.addTagToForm(existed_tag));
        console.log('existed tag pushed', existed_tag);
      }
    }
    this.selectedTag = '';
  }

  toggleWithClick(popover: any) {
    setTimeout(() => {
      popover.isOpen() ? '' : popover.open();
    }, 200);
  }

  // onFileChange(event: any) {
  //   const reader = new FileReader();

  //   if (event.target.files && event.target.files.length) {
  //     const [file] = event.target.files;
  //     reader.readAsDataURL(file);

  //     reader.onload = () => {
  //       this.form.patchValue({
  //         image: reader.result
  //       });
  //     };
  //   }
  // }

  onFileChange(event: any) {
    const reader = new FileReader();
  
    
  
    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
  
      reader.onload = () => {
        this.form.patchValue({
          image: reader.result
        });
        
      };
    } else if (event.target.value) {
      // Handle the case when a file path is added to an empty input
      this.convertFilePathToBase64(event.target.value).then(base64 => {
        this.form.patchValue({
          image: base64
        });
        
      });
    }
  }
  
  openFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
  
  // Convert file path to base64
  convertFilePathToBase64(filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = filePath;
  
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
  
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, img.width, img.height);
  
        const base64 = canvas.toDataURL('image/jpeg'); // Adjust the type if necessary
        resolve(base64);
      };
  
      img.onerror = error => {
        reject(error);
      };
    });
  }
  
  

  save() {
    this.form.value.tags = this.Tags.value.map((tag: Tag) => tag.id);
   

    if (this.form?.valid) {
      if (this.blog) {
        this.blogService
          .update_Blog(this.id, this.form.value)
          .subscribe((blog) => {
            console.log(blog);
            console.log('updated');
            this.router.navigate(['home']);
          });
      } else {
        this.blogService.add_blog(this.form.value).subscribe((blog) => {
          console.log(blog);

          console.log('added');
          this.router.navigate(['home']);
        });
      }
    }
  }
}

// TODO:
// display popover when at least one suggestion exist
// when the blog has no tags an enpty form array readonly input will displayS
// add form validator
