import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenusService } from 'src/app/services/menus.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userIcon = faUserCircle;
  isAuthenticated: boolean = false;

  menus: Menu[] = []

  constructor(private menusServive: MenusService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.menusServive.get_all_Menu().subscribe((menus) => {
      this.menus = menus
    })

    // Subscribe to the isAuthenticated() method to check if the user is authenticated
    this.authService.isAuthenticated().subscribe(
      isAuthenticated => {
        this.isAuthenticated = isAuthenticated;
      }
    );
  }

  logout(){
    this.authService.logout()
    this.router.navigate(['home']);

  }

  

}
