import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-user',
  imports: [CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {
  username = 'daniel';
  isLoggedIn = false; // Esto esta funcionando como un state
  greet(){
    alert('Hola!!!')
  }
}
