import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';
import { ApiauthService } from './services/apiauth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'FrontEndApp';
  usuario: Usuario;

  constructor(public apiauthService: ApiauthService,
    private router: Router) {
    this.apiauthService.usuario.subscribe(res => {
      this.usuario = res
      console.log('objeto cambiado: ' + res)
    });
  }

  logout() {
    this.apiauthService.logout();
    this.router.navigate(['/login']);
  }
}
