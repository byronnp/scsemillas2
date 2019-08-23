import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Settings } from '../../../app.settings.model';
import {MatTableDataSource, } from '@angular/material/table';
import { Router } from '@angular/router';
import { SitiosService } from './sitios.service';
import { MatSort, MatGridTileHeaderCssMatStyler } from '@angular/material';
import { AlertComponent } from '../../../theme/dialogs/alert/alert.component';
import { MatDialog } from '@angular/material';




@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent implements OnInit {

  public page:any;
  public settings: Settings;
  displayedColumns: string[] = ['acciones','id', 'nombre', 'superficie', 'ubicacion','celular'];
  dataSource : any;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  total_count: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: false}) sort: MatSort;

  constructor(
    private router: Router, 
    private sitioServicio : SitiosService,
    public dialog : MatDialog,
    ) { }

 
  ngOnInit() {
    // this.dataSource.paginator = this.paginator;
    this.renderDataTable();
  }  

  //evento de filtro sobre la tabla
  buscarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

   renderDataTable(){
     this.sitioServicio.getSitios().subscribe(
       x => { this.dataSource = new MatTableDataSource();
         this.dataSource.data=x;
         this.dataSource.sort=this.sort;
         this.dataSource.paginator=this.paginator;
         this.isLoadingResults = true;
         this.isRateLimitReached = true;
         this.resultsLength = this.dataSource.data;

       },error => {
         console.log("produjo un error"+error); 
         this.openAlert("Error, consulte con el administrador del servicio..!","cancel");}
     );
   }

  goToPage(pagenaName : string){
    this.router.navigate(['registros/sitios/sitiosform']);
  }

  openAlert(mensaje,icono) : void{
    let dialogRef = this.dialog.open(AlertComponent,{
      data:{mensaje : mensaje, icono:icono}
    });
    dialogRef.afterClosed().subscribe(result=>{
      console.log("listado");
    }); 
  }

  eliminarSitio(valor){
    alert(valor);
  }
  
}

