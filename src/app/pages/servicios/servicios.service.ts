import { Injectable } from "@angular/core";
import { of, Observable } from "rxjs";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { map } from "rxjs/operators";
import { Configuracion } from "../../../assets/configuracion/configuracion.model";
import { AppConfiguracion } from "../../../assets/configuracion/configuracion";
import { Sitios } from "../registros/sitios/sitios";
import { Solicitud } from "../registros/solicitudes/solicitud";

@Injectable({
  providedIn: "root"
})
export class ServiciosService {
  private urlSitios: string;
  private urlDivicionPolitica: string;
  private httpHeaders = new HttpHeaders({ "Content-Type": "application/json" });
  private configuracion: Configuracion;
  private updateDivisionPolitica: string;
  private urlRegistroCivil: string;
  private urlSolicitides: string;

  constructor(
    private http: HttpClient,
    public appconfiguracion: AppConfiguracion
  ) {
    this.configuracion = this.appconfiguracion.configuracion;
    this.urlSitios =
      this.configuracion.urlServicioMag + this.configuracion.ApiSitios; //url para CRUD de SITIOS
    this.urlDivicionPolitica =
      this.configuracion.urlServiciosPitpa + this.configuracion.ApiProvincias;
    this.updateDivisionPolitica =
      this.configuracion.urlServiciosPitpa +
      this.configuracion.recursivaProvincias;
    this.urlRegistroCivil =
      this.configuracion.urlServicioExternos +
      this.configuracion.ApiRegistroCivil;
    this.urlSolicitides =
      this.configuracion.urlServicioMag + this.configuracion.ApiSolicitud;
  }

  //APIS UTILIZADAS EN COMUN
  getProvicias() {
    return this.http.get(this.urlDivicionPolitica + 1);
  }
  getCantonesxId(id) {
    return this.http.get(this.urlDivicionPolitica + id);
  }
  getParroquiasId(id) {
    return this.http.get(this.urlDivicionPolitica + id);
  }
  getRecursivaDivisionPolitica(ubi_id) {
    return this.http.get(this.updateDivisionPolitica + ubi_id);
  }
  getRegistroCivil(cedula) {
    return this.http.get(this.urlRegistroCivil + cedula, {
      headers: this.httpHeaders
    });
  }

  //API PARA PANTALLA DE SITIOS
  getSitios() {
    return this.http.get(this.urlSitios);
  }
  getSitio(sitid) {
    return this.http.get(`${this.urlSitios}/${sitid}`);
  }
  guardarSitio(sitio: Sitios): Observable<Sitios> {
    if (!sitio.sitid) {
      return this.http.post<Sitios>(this.urlSitios, sitio, {
        headers: this.httpHeaders
      });
    } else {
      return this.http.put<Sitios>(`${this.urlSitios}/${sitio.sitid}`, sitio, {
        headers: this.httpHeaders
      });
    }
  }
  deleteSitio(sitid) {
    return this.http.delete(`${this.urlSitios}/${sitid}`);
  }

  //APIS PARA PANTALLA DE SOLICITUDES

  //obtener sitio para combo de sitio
  getSitiosSolicitud() {
    return this.http.get(this.urlSitios);
  }
  guardarSolicitud(solicitud: Solicitud): Observable<Solicitud> {
    if (!solicitud.solid) {
      return this.http.post<Solicitud>(this.urlSolicitides, solicitud, {
        headers: this.httpHeaders
      });
    } else {
      return this.http.put<Solicitud>(
        `${this.urlSolicitides}/${solicitud.solid}`,
        solicitud,
        {
          headers: this.httpHeaders
        }
      );
    }
  }
  getSolicitudes(): Observable<Sitios[]> {
    return this.http.get<Sitios[]>(this.urlSolicitides);
  }
  getSolicitudxId(solid) {
    return this.http.get(`${this.urlSolicitides}/${solid}`);
  }
}
