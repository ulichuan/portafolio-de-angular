import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { InfoPagina } from '../interfaces/info-pagina.interfaces';


@Injectable({
  providedIn: 'root'
})
export class InfoPaginaService {

  info: InfoPagina = {};
  cargada = false;

  equipo: any[] = [];

  constructor( private http: HttpClient ) {

    // console.log('Servicio de infoPagina listo');

    // vamos rescatando los datos de los private de abajo
    this.cargarInfo();
    this.cargarEquipo();

  }

  private cargarInfo() {
    // Leer el archivo JSON y tomar sus propiedades para usar en las pagnas
    this.http.get('assets/data/data-pagina.json')
      .subscribe( (resp: InfoPagina) => {
        this.cargada = true;
        this.info = resp;
      });
  }

  private cargarEquipo() {
    // Leer el archivo JSON y tomar sus propiedades para usar en las pagnas
    this.http.get('https://angular-html-dcccc.firebaseio.com/equipo.json')
      .subscribe( (resp: any[]) => {

        this.equipo = resp;
        // console.log(resp);
      });

    // this.equipo = resp
  }


}
