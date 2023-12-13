import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {
  userForm: FormGroup;
  mensagemSucesso: string | null = null;

  constructor(private http: HttpClient) {
    this.userForm = new FormGroup({
      id: new FormControl(''),
      nome: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      senha: new FormControl('', [Validators.required])
    });
  }

  ngOnInit(): void {
    // Reinicialize a mensagem de sucesso na inicialização do componente
    this.mensagemSucesso = null;
  }

  get nome() {
    return this.userForm.get('nome')!;
  }

  get email() {
    return this.userForm.get('email')!;
  }

  get senha() {
    return this.userForm.get('senha')!;
  }

  submit() {
    if (this.userForm.invalid) {
      return;
    }

    const url = 'http://localhost:3000/usuarios';
    const dados = this.userForm.value;

    this.http.post(url, dados).subscribe(
      (response) => {
        this.mensagemSucesso = 'Dados cadastrados com sucesso';
        this.userForm.reset();
        setTimeout(() => this.mensagemSucesso = null, 5000);

        // Exibe um alerta em caso de sucesso
        alert('Dados cadastrados com sucesso');
      },
      (error) => {
        console.error('Erro ao enviar dados:', error);
        this.mensagemSucesso = 'Erro ao cadastrar dados. Por favor, tente novamente mais tarde.';
        // Limpa a mensagem após alguns segundos (opcional)
        setTimeout(() => this.mensagemSucesso = null, 5000);
      }
    );
  }
}
