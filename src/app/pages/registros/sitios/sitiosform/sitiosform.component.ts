import { Component, OnInit, ɵConsole } from "@angular/core";
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators
} from "@angular/forms";
import { ServiciosService } from "../../../servicios/servicios.service";
import { Sitios } from "../sitios";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { AppSettings } from "src/app/app.settings";
import { Settings } from "src/app/app.settings.model";
import { AlertComponent } from "src/app/theme/dialogs/alert/alert.component";
import { Router, ActivatedRoute } from "@angular/router";
import { THIS_EXPR } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: "app-sitiosform",
  templateUrl: "./sitiosform.component.html",
  styleUrls: ["./sitiosform.component.scss"]
})
export class SitiosformComponent implements OnInit {
  public sitioForm: FormGroup;
  public provincias;
  public cantones;
  public parroquias;
  public select_prov: number;
  public select_can: number;
  public select_par: number;
  public select_hemi: number;
  public settings: Settings;
  private sitio = new Sitios();

  constructor(
    private formBuilder: FormBuilder,
    private sitioServicio: ServiciosService,
    public appSettings: AppSettings,
    public dialog: MatDialog,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.settings = this.appSettings.settings;
  }

  public hemisferios = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "Norte" },
    { id: 2, name: "Sur" }
  ];
  public zonas = [
    { id: 0, name: "Seleccion" },
    { id: 1, name: "15" },
    { id: 2, name: "16" },
    { id: 2, name: "17" },
    { id: 2, name: "18" }
  ];

  ngOnInit() {
    this.validarcamposSitio();
    this.obtenerProvincias();
    this.editarDatos();
  }

  //El guardado y actualizado se controla sobre el servicio
  public onSubmit(values: object): void {
    if (this.sitioForm.valid) {
      if (!this.sitioForm.value.sitid) {
        this.guardarSitios(this.sitioForm.value);
      } else {
        this.guardarSitios(this.sitioForm.value);
      }
    }
  }

  validarcamposSitio() {
    this.sitioForm = this.formBuilder.group({
      sitid: [""],
      sitperidcrea: ["4"],
      sitnombre: ["", Validators.required],
      sitsuperficietotal: [
        "",
        [
          Validators.required,
          Validators.pattern("^[0-9]*$"),
          Validators.maxLength(5)
        ]
      ],
      codprovincia: ["", Validators.required],
      codcanton: ["", Validators.required],
      ubicacionid: ["", Validators.required],
      sitdomicilio: ["", Validators.required],
      sitreferencia: ["", Validators.required],
      sitlatitud: ["", Validators.required],
      sitlongitud: ["", Validators.required],
      sitzona: ["", Validators.required],
      sithemisferio: ["", Validators.required],
      sitcontacto: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ],
      sitcontactocel: [
        "",
        [
          Validators.required,
          Validators.maxLength(10),
          Validators.pattern("^[0-9]*$")
        ]
      ]
    });
  }

  obtenerProvincias() {
    this.sitioServicio.getProvicias().subscribe(data => {
      this.provincias = data;
    });
  }

  obtenerCantones(id) {
    if (id == undefined) {
      return false;
    }
    this.sitioServicio.getCantonesxId(id).subscribe(
      data => {
        this.cantones = data;
      },
      error => {
        console.log(error);
        this.abrirAlert(
          "Error, en consumo de servicios sicpas",
          "cancel",
          "registros/sitios"
        );
      }
    );
  }
  obtenerParroquias(id) {
    if (id == undefined) {
      return false;
    }
    this.sitioServicio.getParroquiasId(id).subscribe(
      data => {
        this.parroquias = data;
      },
      error => {
        console.log(error);
        this.abrirAlert(
          "Error, en consumo de servicios sicpas",
          "cancel",
          "registros/sitios"
        );
      }
    );
  }

  cargaDivisionPolitica(id) {
    this.sitioServicio.getRecursivaDivisionPolitica(id).subscribe(
      data => {
        let codigo_p: number = data["ubicacion"]["ubicacion"];
        let codigo_can = data["ubicacion"]["ubiId"];
        let codigo_par = data["ubiId"];
        this.select_prov = codigo_p["ubiId"];
        this.select_can = codigo_can;
        this.select_par = codigo_par;
      },
      error => {
        console.log(error);
        this.abrirAlert(
          "Error, en consumo de servicios sicpas",
          "cancel",
          "registros/sitios"
        );
      }
    );
  }

  editarDatos(): void {
    this.activateRoute.params.subscribe(
      params => {
        let sitid = params["sitid"];
        if (sitid) {
          this.sitioServicio.getSitio(sitid).subscribe(data => {
            this.cargaDivisionPolitica(data["ubicacionid"]);
            this.sitio = new Sitios();
            this.sitio.sitid = data["sitid"];
            this.sitio.sitnombre = data["sitnombre"];
            this.sitio.sitsuperficietotal = data["sitsuperficietotal"];
            this.sitio.sitdomicilio = data["sitdomicilio"];
            this.sitio.sitreferencia = data["sitreferencia"];
            this.sitio.sitcontacto = data["sitcontacto"];
            this.sitio.sitcontactocel = data["sitcontactocel"];
            this.sitio.sitlatitud = data["sitlatitud"];
            this.sitio.sitlongitud = data["sitlongitud"];
            this.sitio.sithemisferio = data["sithemisferio"];
            this.sitio.sitzona = data["sitzona"];
          });
        }
      },
      error => {
        console.log(error);
        this.abrirAlert(
          "Error, verifique su conexión a Internet",
          "cancel",
          "registros/sitios"
        );
      }
    );
  }

  guardarSitios(formulario) {
    this.sitioServicio.guardarSitio(formulario).subscribe(
      data => {
        if (data.sitid > 0) {
          this.abrirAlert(
            "Datos Guardados correctamente..!",
            "check_circle",
            "registros/sitios"
          );
        } else {
          this.abrirAlert(
            "NO se pudo guardar los datos..!",
            "error_outline",
            "registros/sitios"
          );
        }
      },
      error => {
        console.log(error);
        this.abrirAlert(
          "Error en el servicio de envio los datos..!",
          "cancel",
          "registros/sitios"
        );
      }
    );
  }

  abrirAlert(mensaje, icono, ruta): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensaje: mensaje, icono: icono }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate([ruta]);
    });
  }
}
