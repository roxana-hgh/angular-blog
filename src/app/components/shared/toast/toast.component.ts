import { Component,Input  } from '@angular/core';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [NgbToastModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.css'
})
export class ToastComponent {
  @Input() show = false;
  @Input() autohide  = true;
  @Input() delay  = 3000;
  @Input() message  = "";

}
