import { HttpClient, HttpEvent, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { AuthService } from '../usuarios/auth.service';
import { Cliente } from './cliente';
import { Region } from './region';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  urlEndPoint:string ="http://localhost:8087/api/clientes";

  urlEndPointPost:string ="http://localhost:8087/api/cliente/guardar/cliente";

  constructor( private http:HttpClient,private authService:AuthService) { }

  httpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  agregarAuthorizationHeader():any{
    let token = this.authService.token;
    if(token != null){
      return this.httpHeaders.append('Authorization', 'Bearer '+token);
    }

    return this.httpHeaders;
  }

  /*getClientes():Observable<Cliente[]>{
    return of(CLIENTES);
  }*/
  getClientes():Observable<Cliente[]>{
    return this.http.get(this.urlEndPoint).pipe(
      map( (response) => response as Cliente[] )
    );
  }

  //metodo de post para insertar clientes
  create(cliente:Cliente):Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndPoint,cliente, { headers: this.agregarAuthorizationHeader() });
  }

  //buscar cliente por id
  getCliente(id:number):Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndPoint}/${id}`,{ headers: this.agregarAuthorizationHeader() })
  }

  //actualizar cliente
  update(cliente:Cliente):Observable<Cliente>{
    return this.http.put<Cliente>(`${this.urlEndPoint}/${cliente.id}`, cliente,{ headers: this.agregarAuthorizationHeader() })
  }

  //eliminar cliente
  delete(id:number):Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndPoint}/${id}`,{ headers: this.agregarAuthorizationHeader() })
  }

  // mostrar regiones
  getRegiones():Observable<Region[]>{
    return this.http.get<Region[]>(`${this.urlEndPoint}/regiones`,{ headers: this.agregarAuthorizationHeader() });
  }

  //subir imagen
  subirImagen(archivo: File, id:any):Observable<HttpEvent<any>>{
    let formData = new FormData();

    formData.append("archivo",archivo);
    formData.append("id",id);

    let httpHeaders = new HttpHeaders();

    let token= this.authService.token;

    if(token != null){
      httpHeaders = httpHeaders.append('Authorization','Bearer '+token);
    }

    const req = new HttpRequest('POST',`${this.urlEndPoint}/upload`,formData,{headers:httpHeaders});

    return this.http.request(req).pipe(
      resp =>resp
    );
  }









}
