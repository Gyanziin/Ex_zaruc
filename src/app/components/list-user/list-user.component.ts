import { Component } from '@angular/core';
import { Usuario } from '../../interfaces/Usuario';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  usuarios: Usuario[] = [];
  usuarioEdit: Usuario = { id: 0, name: '', email: '', password: '' };

  constructor(private authService: AuthService) {
    this.getUsuarios();
  }

  removeUsuario(usuario: Usuario) {
    this.authService.remove(usuario.id).subscribe(() => {
      this.getUsuarios();
    });
  }

  getUsuarios(): void {
    this.authService.getAll().subscribe((usuarios) => (this.usuarios = usuarios));
  }
}
