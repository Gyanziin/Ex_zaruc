import { Component } from '@angular/core';
import { RequestLogin } from '../../resouces/models/RequestLogin';
import { LoginService } from '../../services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public requestLogin!: RequestLogin

  constructor(private loginService: LoginService) {}

  ngOnInit(): void {
    this.requestLogin = new RequestLogin()
  }

  public doLogin(): void {
    this.loginService.doLogin(this.requestLogin).subscribe(data => {
      console.log('cade poha')
    },
    error => {
      console.error(error)
    }
    )
  }

}

