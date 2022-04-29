import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule} from '@angular/material/sidenav'
import { HomeComponent } from './home/home.component';
import { ClienteComponent } from './cliente/cliente.component';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http'
import { MatTableModule} from '@angular/material/table'
import { MatDialogModule } from '@angular/material/dialog'
import { MatCardModule } from '@angular/material/card'
import { MatButtonModule} from '@angular/material/button'
import { DialogClienteComponent} from './dialog/dialogcliente.component';
import { MatInputModule} from '@angular/material/input'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { FormsModule, ReactiveFormsModule} from '@angular/forms'
import { DialogDeleteComponent} from './common/delete/dialogDelete.component'
import { LoginComponent } from './login/login.component';
import { JwtInterceptor } from './security/jwt.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ClienteComponent,
    DialogClienteComponent,
    DialogDeleteComponent,
    LoginComponent
  ],
  imports: [
    MatTableModule,
    MatSidenavModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatSnackBarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,useClass: JwtInterceptor, multi: true
  }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
