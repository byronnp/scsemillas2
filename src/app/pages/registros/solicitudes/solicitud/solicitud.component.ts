import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.scss']
})
export class SolicitudComponent implements OnInit {
  public solicitudForm:FormGroup;

  constructor( private formBuilder:FormBuilder ) { }

  public sitios = [
    {id:0,name:'Seleccion'},
    {id:1,name:'Azuay'},
    {id:2,name:'Loja'},
    {id:3,name:'Guayas'},
    {id:4,name:'Pichincha'},
    {id:5,name:'Zamora'},
    {id:6,name:'Galapagos'},
    {id:7,name:'El Oro'},
    {id:8,name:'Manabi'}
  ];

  ngOnInit() {
  }

  public onSubmit (values:object):void{
    if(this.solicitudForm.valid){
      alert("siiiiinooooo");
    }
  }

}
