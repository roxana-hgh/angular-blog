import { Component, OnInit } from '@angular/core';
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

@Component({
  selector: 'app-add-edit-blog',
  templateUrl: './add-edit-blog.component.html',

  styleUrls: ['./add-edit-blog.component.css'],
})
export class AddEditBlogComponent implements OnInit {
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
  ) {}

  get Tags() {
    return this.tagform.controls['tagsArray'] as FormArray;
  }

  addTags() {
    const Tag_Form = this.fb.group({
      id: [null],
      title: ['', Validators.required],
    });
    this.Tags.push(Tag_Form);
  }

  deleteTag(lessonIndex: number) {
    this.Tags.removeAt(lessonIndex);
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
  }

  private captureIdFromURL() {
    return Number(this.route.snapshot.paramMap.get('id'));
  }

  private getBlog(id: number) {
    this.blogService.get_blog(id).subscribe((blog) => {
      if (blog) {
        this.blog = blog;
        this.getBlogTags();
        this.formGenerator(this.blog);
        this.TagFormGenerator(this.blog);
      }
    });
  }

  private gettagByid(id: number) {
    this.TagsService.get_Tag(id).subscribe((tag: Tag) => {
      this.blog_tags.push({ id: tag.id, title: tag.title });
    });
  }

  private getBlogTags() {
    this.blog?.tags?.forEach((tag_id) => {
      this.gettagByid(tag_id);
    });
  }

  private TagFormGenerator(model: Blog | null) {
    if (model != null && model.tags) {
      console.log('Model tags:', model.tags); // Log the model tags for debugging
      model.tags.map((t: number) => {
        // Log each tag for debugging
        this.TagsService.get_Tag(t).subscribe((tag: Tag) => {
          console.log('Tag:', tag);
          let TagsForm = this.fb.group({
            id: [tag.id],
            title: [tag.title],
          });
          this.Tags.push(TagsForm);
        });
      });
    } else {
      let TagsForm = this.fb.group({
        id: [null],
        title: [''],
      });
      this.Tags.push(TagsForm);
    }
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

  // TODO:
  // add form validator

  get_all_tags() {
    this.TagsService.get_all_Tags().subscribe((tags) => {
      this.all_tags = tags;
      this.filter_tags = tags;
    });
  }

  saveTags() {
    //console.log(this.tagform.value);
    // console.log(this.all_tags);
    let all_tags_name = this.all_tags.map((t: any) => {
      return t.title;
    });
    console.log(all_tags_name);
    this.tagform.value.tagsArray?.forEach((taginput: any) => {
      if (taginput.id) {
        this.new_blog_tags.push(taginput.id);
      }

      if (!all_tags_name.includes(taginput.title)) {
        this.TagsService.add_Tag(taginput).subscribe((tag: any) => {
          console.log('new');

          this.new_blog_tags.push(tag.id);
        });
      } else if (all_tags_name.includes(taginput.title)) {
        let existed_tag = this.all_tags.find(
          (t) => t.title === taginput.title
        )?.id;

        if (existed_tag) {
          this.new_blog_tags.push(existed_tag);
        }
      }
    });
  }

  taginput(e: Event) {
    this.filter_tags = this.all_tags.filter((tag: any) =>
      tag.title.includes((e.target as HTMLInputElement).value)
    );
  }

  toggleWithClick(popover: any) {
    setTimeout(() => {
      popover.isOpen() ? '' : popover.open();
    }, 200);
  }

  save() {
    this.form.value.tags = this.new_blog_tags;
    console.log(this.new_blog_tags);
    console.log(this.form.value);

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
