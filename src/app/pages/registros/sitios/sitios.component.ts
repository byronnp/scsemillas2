import { Component, OnInit, ViewChild, Injectable } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { Settings } from "../../../app.settings.model";
import { MatTableDataSource } from "@angular/material/table";
import { Router } from "@angular/router";
import { ServiciosService } from "../../servicios/servicios.service";
import { MatSort, MatGridTileHeaderCssMatStyler } from "@angular/material";
import { AlertComponent } from "../../../theme/dialogs/alert/alert.component";
import { ConfirmComponent } from "../../../theme/dialogs/confirm/confirm.component";
import { MatDialog } from "@angular/material";
import { Sitios } from "../sitios/sitios";
import { DatosTabla } from "../sitios/sitios";
import { filter, map } from "rxjs/operators";
import { Observable, observable, Subscriber } from "rxjs";

@Component({
  selector: "app-sitios",
  templateUrl: "./sitios.component.html",
  styleUrls: ["./sitios.component.scss"]
})
export class SitiosComponent implements OnInit {
  public page: any;
  public settings: Settings;
  private sitio = new Sitios();
  public nombre_prov: string;
  public nombre_can: string;
  public nombre_par: string;
  public datosTabla = new Sitios();
  displayedColumns: string[] = [
    "nombre",
    "superficie",
    "ubicacion",
    "acciones"
  ];
  dataSource: any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;

  constructor(
    private router: Router,
    private sitioServicio: ServiciosService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
    this.renderDataTable();
  }

  ngOnInit() {}

  //evento de filtro sobre la tabla
  buscarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  renderDataTable() {
    this.sitioServicio.getSitios().subscribe(
      result => {
        this.obtenerDatos(result);
      },
      error => {
        console.log("produjo un error", error);
        this.openAlert(
          "Error, consulte con el administrador del servicio..!",
          "cancel"
        );
      }
    );
  }

  goToPage(pagenaName: string) {
    this.router.navigate(["registros/sitios/sitiosform"]);
  }

  openAlert(mensaje, icono): void {
    const dialogRef = this.dialog.open(AlertComponent, {
      data: { mensaje: mensaje, icono: icono }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log("cerrar");
    });
  }

  //@mensaje = 'mensaje a mostrar en el mensaje de conformación'
  //@icono = 'se enviara el icono que se desea mostrar'
  //@valor = en el cao de liminar registros se enviara el ID de registro a eliminar
  openConfirm(mensaje, icono, valor): void {
    let dialogRef = this.dialog.open(ConfirmComponent, {
      data: { mensaje: mensaje, icono: icono }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.sitioServicio.deleteSitio(valor).subscribe(
          data => {
            this.renderDataTable();
          },
          error => {
            console.log(error);
            this.openAlert(
              "Error, al eliminar el registro, consulte al Administrador..!",
              "cancel"
            );
          }
        );
      }
    });
  }

  eliminarRegistro(sitId) {
    this.openConfirm(
      "¿Esta seguro que desea Eliminar el registro?",
      "notifications_active",
      sitId
    );
  }

  // datosTables(data) {
  //   for (let res in data) {
  //     if (data[res].ubicacionid) {
  //       const ubicaciones = this.sitioServicio
  //         .getRecursivaDivisionPolitica(data[res].ubicacionid)
  //         .subscribe(
  //           data => data["ubicacion"]["ubicacion"]["ubiNombre"],
  //           error => console.log(error),
  //           () => console.log("Consulta correcta!")
  //         );
  //     }
  //   }
  // }

  obtenerDatos(data) {
    const resSitios = [];
    this.retornarObservable(data).subscribe(
      result => {
        resSitios.push(result);
        this.dataSource = new MatTableDataSource();
        this.dataSource.data = resSitios;
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.isLoadingResults = true;
        this.isRateLimitReached = true;
        this.resultsLength = this.dataSource.data;
      },
      error => console.log(error),
      () => console.log("correcto")
    );
  }

  retornarObservable(data): Observable<Array<any>> {
    return new Observable((observer: Subscriber<any>) => {
      for (let res in data) {
        if (data[res].ubicacionid) {
          this.sitioServicio
            .getRecursivaDivisionPolitica(data[res].ubicacionid)
            .subscribe(
              resp => {
                this.datosTabla = new Sitios();
                this.datosTabla.sitProvincia =
                  resp["ubicacion"]["ubicacion"]["ubiNombre"];
                this.datosTabla.sitCanton = resp["ubicacion"]["ubiNombre"];
                this.datosTabla.sitCanton = resp["ubiNombre"];
                this.datosTabla.sitid = data[res].sitid;
                this.datosTabla.sitnombre = data[res].sitnombre;
                this.datosTabla.sitsuperficietotal =
                  data[res].sitsuperficietotal;

                const obj = JSON.stringify(this.datosTabla);
                observer.next(JSON.parse(obj));
              },
              error => console.log(error),
              () => console.log("consulta finalizada!")
            );
        }
      }
      // observer.next(resSitios);
    }).pipe(
      map(resp => {
        return resp;
      })
    );
  }
}
