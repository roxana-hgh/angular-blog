import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Menu } from 'src/app/interfaces/menu';

@Component({
  selector: 'app-menu-form',
  templateUrl: './menu-form.component.html',
  styleUrl: './menu-form.component.css',
})
export class MenuFormComponent implements OnInit {
  @Input() menuItem?: Menu;
  //@Output() SubmitmenuForm = new EventEmitter<Menu>()

  menuForm!: FormGroup;

  constructor(public activeModal: NgbActiveModal) {}

  ngOnInit(): void {
    if (this.menuItem) {
      this.menuFormGenerator(this.menuItem);
    } else {
      this.menuFormGenerator(null);
    }
  }

  private menuFormGenerator(Menu: Menu | null) {
    this.menuForm = new FormGroup({
      id: new FormControl(Menu ? Menu.id : null),
      title: new FormControl(Menu ? Menu.title : '', [
        Validators.minLength(1),
        Validators.required,
      ]),
      link: new FormControl(Menu ? Menu.link : ''),
    });
  }

  onformSubmit(){
    this.activeModal.close(this.menuForm?.value);
  }
}
