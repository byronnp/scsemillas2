import { Injectable } from '@angular/core';
import { Configuracion } from './configuracion.model';

@Injectable()

export class AppConfiguracion{
    public configuracion = new Configuracion(
        'http://10.10.1.18:8080/', //URL DE SERVICIOS DE API DE PITPA
        'http://192.168.80.48:8080/',//URL DE SERVICIOS DE API DE SEMILLAS
        'http://10.10.1.33:8080/',//URL DE SERVICIOS EXTERNOS
        'apisitio/sitio', // API PARA SITIOS
        'api_sicpas-0.0.1/proxi/ubicacion/findChildrenByUbiId/',//CONSULTA DIVISION POLITICA
        'api_sicpas-0.0.1/proxi/ubicacion/findByUbiId/', //API PARA CONSULTA DE DIVISION POLITICA EN RECURSIVA
        'apiserviciosexternos-0.0.1-SNAPSHOT/utilitarios/registrocivildatosciudadano/', //API PARA CONSULTA REGISTRO CIVIL
        'apisolicitud/solicitud/' //INSERT, UPDATE, DELETE, GET BY ID DE SOLICITUDES
    )

}
