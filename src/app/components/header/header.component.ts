import { Component, OnInit } from '@angular/core';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'src/app/interfaces/menu';
import { MenusService } from 'src/app/services/menus.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserCircle;

  menus: Menu[] = []

  constructor(private menusServive: MenusService,) { }

  ngOnInit(): void {
    this.menusServive.get_all_Menu().subscribe((menus) => {
      this.menus = menus
    })
  }

}
