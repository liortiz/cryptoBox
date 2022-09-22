import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DesplazamientoService } from '../../servicios/clasicos/desplazamiento.service'

@Component({
  selector: 'app-desplazamiento',
  templateUrl: './desplazamiento.component.html',
  styleUrls: ['./desplazamiento.component.css']
})
export class DesplazamientoComponent implements OnInit {

  formDesplazamiento: FormGroup;
  permutation = {text:"",key:""}
  text: string;
  key: string;
  textEncrypt: string = '';



  constructor(private conection: DesplazamientoService, private formBuilder: FormBuilder) { 
    this.text = '';
    this.key = '';
    this.formDesplazamiento = this.formBuilder.group({
      text:["",Validators.compose([Validators.required])],
      key:["",Validators.compose([Validators.required])]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValores(){
    if(this.formDesplazamiento.valid){
      this.permutation = this.formDesplazamiento.getRawValue();
    this.conection.getDesplazamientoE(this.permutation.text,this.permutation.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))

    }
    
    
  //console.log(this.textEncrypt);
  }

}
