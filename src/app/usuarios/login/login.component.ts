import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Usuario } from '../usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: Usuario = new Usuario();

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
  }

  login():void{
    console.log(this.usuario);

    this.authService.login(this.usuario).subscribe(
      resp => {
        console.log(resp);
      },
      err=>{
        console.log(err);
      }

    );
    
  }
}
