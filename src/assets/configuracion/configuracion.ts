import { Injectable } from '@angular/core';
import { Configuracion } from './configuracion.model';

@Injectable()

export class AppConfiguracion{
    public configuracion = new Configuracion(
        'http://10.10.1.18:8087/', //URL DE SERVICIOS DE API DE PITPA
        'http://192.168.80.48:8080/',//URL DE SERVICIOS DE API DE SEMILLAS
        'apisitio/sitio', // API PARA SITIOS
        'api_sicpas-0.0.1/proxi/ubicacion/findChildrenByUbiId/',//CONSULTA DIVISION POLITICA
        'api_sicpas-0.0.1/proxi/ubicacion/findByUbiId/' //API PARA CONSULTA DE DIVISION POLITICA EN RECURSIVA
    )

}
