import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';
import { resolve } from 'url';
import { reject } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  productos: Producto[] = [];
  productosFiltrado: Producto[] = [];

  constructor( private http: HttpClient ) {

    this.cargarProductos();

  }

  private cargarProductos() {

    // tslint:disable-next-line: no-shadowed-variable
    return new Promise( ( resolve, reject ) => {
      this.http.get('https://angular-html-dcccc.firebaseio.com/productos_idx.json')
      .subscribe( (resp: Producto[]) => {
        this.productos = resp;
        this.cargando = false;
        resolve();
        });
    });

  }

  getProducto( id: string ) {
    return this.http.get(`https://angular-html-dcccc.firebaseio.com/productos/${ id }.json`);
  }

  buscarProducto( termino: string ) {

    if ( this.productos.length === 0 ) {
      // cargar productos
      this.cargarProductos().then( () => {
        // ejecutar despues de tener los productos
        // aquí aplicar el filtro
        this.filtrarProductos( termino );
      });

    } else {
      // apllicar el filtro
      this.filtrarProductos( termino );
    }



  }

  private filtrarProductos( termino: string ) {

    console.log(this.productos);
    this.productosFiltrado = [];

    // hacemos que se conviertan los terminos a minusculas
    termino = termino.toLocaleLowerCase();

    this.productos.forEach( prod => {

      // variable temporal para chequear que los titulos cambian a minúsculas
      // y la llamaré tituloLower
      const tituloLower = prod.titulo.toLocaleLowerCase();

      if ( prod.categoria.indexOf( termino) >= 0 || tituloLower.indexOf( termino ) >= 0 ) {
        this.productosFiltrado.push( prod );
      }

    });

  }

}
