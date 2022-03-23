import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/usuarios/auth.service';
import swal from 'sweetalert2';
import { Cliente } from '../cliente';
import { ClienteService } from '../cliente.service';
import { Region } from '../region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styles: [
  ]
})
export class FormComponent implements OnInit {

  titulo:string ="Nuevo Cliente";

  cliente: Cliente = new Cliente();

  regiones!:Region[];

  constructor( private clienteService:ClienteService,
    private router:Router, private activatedRoute:ActivatedRoute,
    private authService:AuthService) { }

  ngOnInit(): void {


    if(this.authService.token){

      this.clienteService.getRegiones().subscribe(
        resp => this.regiones = resp
      );

      this.activatedRoute.paramMap.subscribe(
        params =>{
          let id = +params.get('id')!;
          if(id){
            this.clienteService.getCliente(id).subscribe(
              (resp) => this.cliente = resp
            )
          }
        }
      );

    }else{
      swal('No esta autenticado','no autenticado','info');
      this.router.navigate(['/login']);

    }




  }

  compararRegion(o1:Region,o2:Region):boolean{
    if(o1 === undefined && o2 ===undefined){
      return true;
    }

    return o1 === null || o2===null ||
     o1===undefined ||
      o2===undefined ? false : o1.id===o2.id;

  }


  create():void{
    console.log("formulario enviado");
    console.log(this.cliente);
    this.clienteService.create(this.cliente).subscribe(
      resp => {
        swal('Nuevo Cliente',`${this.cliente.nombre} creado con éxito`,'success');
        this.router.navigate(['/clientes']);
      },
      err=>{
        console.log('Codigo de error backend',err.status);
      }
    );
  }

  update():void{
    console.log(this.cliente);
    this.clienteService.update(this.cliente).subscribe(
      resp=>{
        this.router.navigate(['/clientes']);
        swal('Cliente Actualizado',`${this.cliente.nombre}`,'success');
      },
      err=>{
        console.error('Codigo del error desde el backend'+err.status);
        console.error(err.error.errros)
      }
    );
  }

}
