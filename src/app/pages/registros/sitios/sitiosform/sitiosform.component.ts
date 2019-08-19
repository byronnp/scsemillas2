import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';

@Component({
  selector: 'app-sitiosform',
  templateUrl: './sitiosform.component.html',
  styleUrls: ['./sitiosform.component.scss']
})
export class SitiosformComponent implements OnInit {
  public sitioForm:FormGroup;
  
  constructor( private formBuilder:FormBuilder) { }

  public provincias = [
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
  public hemisferios = [
    {id:0,name:'Seleccion'},
    {id:1,name:'Norte'},
    {id:2,name:'Sur'}
  ];
  public zonas = [
    {id:0,name:'Seleccion'},
    {id:1,name:'15'},
    {id:2,name:'16'},
    {id:2,name:'17'},
    {id:2,name:'18'}
  ];


  ngOnInit() {
    this.sitioForm = this.formBuilder.group({
       
     });
  }
  public onSubmit (values:object):void{
    if(this.sitioForm.valid){
      alert("siiiii");
    }
  }

}
