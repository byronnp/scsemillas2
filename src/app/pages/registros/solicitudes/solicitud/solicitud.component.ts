import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { MatDialog } from "@angular/material";
import { Router, ActivatedRoute } from "@angular/router";
import { ServiciosService } from "../../../servicios/servicios.service";
import { AppSettings } from "../../../../app.settings";
import { Settings } from "../../../../app.settings.model";

import { AlertComponent } from "../../../../theme/dialogs/alert/alert.component";
import { Solicitud } from "../solicitud";

@Component({
  selector: "app-solicitud",
  templateUrl: "./solicitud.component.html",
  styleUrls: ["./solicitud.component.scss"]
})
export class SolicitudComponent implements OnInit {
  public solicitudForm: FormGroup;
  public settings: Settings;
  public sitios;
  private solicitud = new Solicitud();
  constructor(
    private formBuilder: FormBuilder,
    private solicitudServicio: ServiciosService,
    public appSettings: AppSettings,
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.settings = appSettings.settings;
  }

  public cultivos = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "arroz" },
    { id: 2, name: "maiz" },
    { id: 3, name: "cebada" },
    { id: 4, name: "cafe" },
    { id: 5, name: "cacao" }
  ];

  public varidades = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "arroz blanco" },
    { id: 2, name: "arroz verde" },
    { id: 3, name: "cebada granulada" },
    { id: 4, name: "cafe moro" },
    { id: 5, name: "cacao 501" }
  ];

  public categorias = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "categoria 1" },
    { id: 2, name: "categoria 2" },
    { id: 3, name: "categoria 3" },
    { id: 4, name: "categoria 4" },
    { id: 5, name: "categoria 5" }
  ];

  public marbetes = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "marbetees" },
    { id: 2, name: "marbetees 2" },
    { id: 3, name: "marbetees 3" },
    { id: 4, name: "marbetees 4" },
    { id: 5, name: "marbetees 5" }
  ];

  ngOnInit() {
    this.validarFormulario();
    this.obtenerSitios();
    this.editarSolicitud();
  }

  public Submit(values: object): void {
    if (this.solicitudForm.valid) {
      this.guardarSolicitud(this.solicitudForm.value);
    }
  }

  validarFormulario() {
    this.solicitudForm = this.formBuilder.group({
      solcimultiplicador: ["", [Validators.required]],
      sitid: [""],
      solid: [""],
      cultivoid: [""],
      catculid: [""],
      categid: [""],
      marbeteid: [""],
      solnombremultiplicador: [""],
      soltelefonomultiplicador: [""]
    });
  }
  //se carga combo con con sitios ingresados
  obtenerSitios() {
    this.solicitudServicio.getSitiosSolicitud().subscribe(data => {
      this.sitios = data;
    });
  }

  consultarRc(value) {
    this.solicitudServicio.getRegistroCivil(value).subscribe(data => {
      console.log(data);
    });
  }

  guardarSolicitud(formulario): void {
    this.solicitudServicio.guardarSolicitud(formulario).subscribe(
      data => {
        if (data.solid) {
          this.abrirAlert(
            "Datos Guardados correctamente..!",
            "check_circle",
            "registros/solicitudes"
          );
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  abrirAlert(mensaje, icono, ruta): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensaje: mensaje, icono: icono }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.router.navigate([ruta]);
    });
  }

  editarSolicitud(): void {
    this.activateRoute.params.subscribe(
      params => {
        const solId = params.solid;
        if (solId) {
          this.solicitudServicio.getSolicitudxId(solId).subscribe(data => {
            this.solicitud = new Solicitud();
            this.solicitud.solid = data["solid"];
            this.solicitud.sitid = data["sitid"];
            this.solicitud.cultivoid = data["cultivoid"];
            this.solicitud.marbeteid = data["marbeteid"];
            this.solicitud.solcimultiplicador = data["solcimultiplicador"];
            this.solicitud.solnombremultiplicador =
              data["solnombremultiplicador"];
            this.solicitud.soltelefonomultiplicador =
              data["soltelefonomultiplicador"];
            this.solicitud.catculid = data["catculid"];
            this.solicitud.categid = data["categid"];
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }
}
