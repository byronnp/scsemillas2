import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import { Settings } from '../../../app.settings.model';
import {MatTableDataSource} from '@angular/material/table';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sitios',
  templateUrl: './sitios.component.html',
  styleUrls: ['./sitios.component.scss']
})
export class SitiosComponent implements OnInit {

  public page:any;
  public settings: Settings;
  displayedColumns: string[] = ['id', 'nombre', 'superficie', 'provincia'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  constructor(private router: Router) {
    
  }

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.dataSource.paginator = this.paginator;
  }  

  //evento de filtro sobre la tabla
  buscarFiltro(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  goToPage(pagenaName : string){
    this.router.navigate(['registros/sitios/sitiosform']);
  }
  
}

export interface PeriodicElement {
  id: number;
  nombre: string;
  superficie: number;
  provincia: string;
}

/** Constants used to fill up our data base. */
const ELEMENT_DATA: PeriodicElement[] = [
  {id: 1, nombre: 'Hydrogen', superficie: 1.0079, provincia: 'PICHINCHA'},
  {id: 2, nombre: 'Helium', superficie: 4.0026, provincia: 'GUAYAS'},
  {id: 3, nombre: 'Lithium', superficie: 6.941, provincia: 'EL ORO'},
  {id: 4, nombre: 'Beryllium', superficie: 9.0122, provincia: 'MANABI'},
  {id: 5, nombre: 'Boron', superficie: 10.811, provincia: 'GALAPAGOS'},
  {id: 6, nombre: 'Carbon', superficie: 12.0107, provincia: 'ZUCUMBIOS'},
  {id: 7, nombre: 'Nitrogen', superficie: 14.0067, provincia: 'PAZTAZA'},
  {id: 8, nombre: 'Oxygen', superficie: 15.9994, provincia: 'EL ORO'},
  {id: 9, nombre: 'Fluorine', superficie: 18.9984, provincia: 'GALAPAGOS'},
  {id: 10, nombre: 'Neon', superficie: 20.1797, provincia: 'PICHINCHA'},
];

