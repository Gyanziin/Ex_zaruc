import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  error: string = '';

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (result) => {
        if (result.success) {
        } else {
          this.error = result.message;
        }
      },
      (error) => {
        this.error = 'Erro ao verificar usuário';
      }
    );
  }
}
