import { Component, OnInit } from '@angular/core';
import {
  ModalDismissReasons,
  NgbModal,
} from '@ng-bootstrap/ng-bootstrap';
import {  Router } from '@angular/router';
import { Blog } from 'src/app/interfaces/blog';
import { BlogsService } from 'src/app/services/blogs.service';

@Component({
  selector: 'app-blog-lists',
  templateUrl: './blog-lists.component.html',
  styleUrls: ['./blog-lists.component.css'],
})
export class BlogListsComponent implements OnInit {
  blogs!: Blog[];


  constructor(
    private blogsService: BlogsService,
    private modalService: NgbModal,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.blogsService.get_all_blogs().subscribe((blogs) => {
      this.blogs = blogs;
    });
  }

  open(content: any) {
		this.modalService.open(content, { centered: true });
	}
  delete(id: number){
    this.blogsService.delete_Blog(id).subscribe(()=> {
      this.router.navigate(['admin'])
    })

  }

	

}
