import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import { ClienteService } from './cliente.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { Region } from './region';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  private cliente:Cliente = new Cliente();
  private titulo:string = "Crear cliente";
  private errors:string[];
  private regiones:Region[];

  constructor(
    private clienteService:ClienteService,
    private router:Router,
    private activatedRoute:ActivatedRoute) { }

  ngOnInit() {
    this.cargarCliente();
    this.clienteService.getRegiones().subscribe(regiones => this.regiones = regiones);
  }

  public cargarCliente():void {
    this.activatedRoute.params.subscribe(params => {
      let id = params['id'];
      if (id) {
        this.clienteService.getCliente(id).subscribe(
          (cliente) => this.cliente = cliente
        );
      }
    });
  }

  public create():void {
    this.clienteService.create(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        swal.fire('Nuevo cliente', `${json.mensaje}`,'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log(this.errors);
      }
    );
  }

  public update():void {
    this.clienteService.update(this.cliente).subscribe(
      json => {
        this.router.navigate(['/clientes']);
        swal.fire('Cliente Actualizado', `${json.mensaje}`,'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        console.log(this.errors);
      }
    )
  }

  public compararRegion(o1:Region, o2:Region):boolean {

    if (o1 === undefined && o2 === undefined)
      return true;
      
    return o1 == null || o2 == null ? false : o1.id === o2.id;
    
  }

}
