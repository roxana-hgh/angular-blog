import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Menu } from 'src/app/interfaces/menu';
import { AuthService } from 'src/app/services/auth.service';
import { MenusService } from 'src/app/services/menus.service'; 

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {

  userIcon = faUserCircle;
  isAuthenticated: boolean = false;
  private userSub !: Subscription;

  menus: Menu[] = []

  constructor(private menusServive: MenusService,private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.menusServive.get_all_Menu().subscribe((menus) => {
      this.menus = menus
    })

    //  to check if the user is authenticated
    // this.userSub = this.authService.user.subscribe(user => {
    //   this.isAuthenticated = !!user
    // })
 
  }

  logout(){
    // this.authService.logout()
    this.router.navigate(['home']);

  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe()
  }

  

}
