import { Injectable } from '@angular/core';
import { Sitios } from './sitios';
import { of, Observable} from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Configuracion }from '../../../../assets/configuracion/configuracion.model';
import { AppConfiguracion } from '../../../../assets/configuracion/configuracion';


@Injectable({
  providedIn: 'root'
})
export class SitiosService {

  private urlSitios:string;  
  private urlDivicionPolitica : string;  
  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});
  private configuracion : Configuracion;
  private updateDivisionPolitica :string;

  constructor(private http: HttpClient, public appconfiguracion : AppConfiguracion) {   
    this.configuracion = this.appconfiguracion.configuracion;
    this.urlSitios = this.configuracion.urlServicioMag + this.configuracion.ApiSitios; //url para CRUD de SITIOS
    this.urlDivicionPolitica = this.configuracion.urlServiciosPitpa+this.configuracion.ApiProvincias; //url para consulta division politica 
    this.updateDivisionPolitica = this.configuracion.urlServiciosPitpa+this.configuracion.recursivaProvincias;
  }
  
  getSitios(){return this.http.get(this.urlSitios);}

  guardarSitio(sitio: Sitios) : Observable<Sitios>{
    if(!sitio.sitid){
      return this.http.post<Sitios>(this.urlSitios,sitio,{headers: this.httpHeaders})
    }else{
      return this.http.put<Sitios>(`${this.urlSitios}/${sitio.sitid}`, sitio, {headers: this.httpHeaders})
    }
  }
  getSitio(sitid){return this.http.get(`${this.urlSitios}/${sitid}`);}
    
  getProvicias(){return this.http.get(this.urlDivicionPolitica+1);}
  getCantonesxId(id){return this.http.get(this.urlDivicionPolitica+id);}
  getParroquiasId(id){return this.http.get(this.urlDivicionPolitica+id);}
  getRecursivaDivisionPolitica(ubi_id){ return this.http.get(this.updateDivisionPolitica+ubi_id);}
}
