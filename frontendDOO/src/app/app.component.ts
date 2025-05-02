import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserComponent } from './user/user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { RegistroAdminComponent } from './registro-admin/registro-admin.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, UserComponent,RegistroAdminComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  city = 'Barcelona';
}
