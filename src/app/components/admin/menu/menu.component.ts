import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


import { Menu } from 'src/app/interfaces/menu';
import { MenusService } from 'src/app/services/menus.service';
import { MenuFormComponent } from 'src/app/modals/menu-form/menu-form/menu-form.component';
import { faLink, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-menu',

  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
})
export class MenuComponent implements OnInit {
  linkIcon = faLink;
  EditIcon = faEdit;
  deleteIcon = faTrash;

  menus: Menu[] = [];
  toast: boolean = false;
  toastMessage = '';

  constructor(
    private menusServive: MenusService,
    private modal: NgbModal,
    private router: Router,
    private route: ActivatedRoute
  ) 

  {
    this.router.routeReuseStrategy.shouldReuseRoute = () => {
      return false;
    };
  }

  ngOnInit() {
    this.menusServive.get_all_Menu().subscribe((menus) => {
      this.menus = menus;
    });
  }

  openModal(menuItem: Menu | null){
    let modal = this.modal.open(MenuFormComponent, {
      centered: true,
    });
    modal.componentInstance.menuItem = menuItem? menuItem : null;
    
    // on close modal
    modal.closed.subscribe((form_data: Menu) => {
      if (form_data.id != null) {
        this.menusServive.update_Menu(form_data.id, form_data ).subscribe((menu)=> {
          console.log(`menu updated: `, menu);
          this.router.navigate(['/admin/menus/']);
          
        })
        
      }else {
        this.menusServive.add_Menu(form_data).subscribe((menu)=> {
          console.log(`menu Added: `, menu);
          this.router.navigate(['/admin/menus/']);
        })
      }
      
    });
  }

  delete(id: number) {
    this.menusServive.delete_Menu(id).subscribe(() => {
      this.toastMessage = 'Menu Item Deleted';
      this.toast = true;

      this.router.navigate(['/admin/menus/']);
    });
  }
}
