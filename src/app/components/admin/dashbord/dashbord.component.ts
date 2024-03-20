import { Component } from '@angular/core';
import { faBlog, faEllipsisH } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrl: './dashbord.component.css'
})
export class DashbordComponent {
  fablog = faBlog;
  famenu = faEllipsisH
}
