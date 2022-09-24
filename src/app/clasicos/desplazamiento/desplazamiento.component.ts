import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { DesplazamientoService } from '../../servicios/clasicos/desplazamiento.service'

@Component({
  selector: 'app-desplazamiento',
  templateUrl: './desplazamiento.component.html'
})
export class DesplazamientoComponent implements OnInit {

  formDesplazamiento: FormGroup;
  desplazamiento = {text:"",key:""}
  textE: string;
  textD: string;
  textA: string;
  key: string;
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;



  constructor(private connection: DesplazamientoService, private formBuilder: FormBuilder) { 
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.formDesplazamiento = this.formBuilder.group({
      text:[""],
      key:[""]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.desplazamiento = this.formDesplazamiento.getRawValue();
    if (this.random){
      this.desplazamiento.key = this.key
    }
    this.connection.getDesplazamientoE(this.desplazamiento.text,this.desplazamiento.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.desplazamiento = this.formDesplazamiento.getRawValue();
    if (this.random){
      this.desplazamiento.key = this.key
    }
    this.connection.getDesplazamientoD(this.desplazamiento.text,this.desplazamiento.key)
    .subscribe(data=>{
      this.textDesencrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formDesplazamiento.valid){
      this.desplazamiento = this.formDesplazamiento.getRawValue();
      this.connection.getDesplazamientoA(this.desplazamiento.text,this.desplazamiento.key)
      .subscribe(data=>{
        console.log(data.Analisis)
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.key = String(Math.floor(Math.random() * (26 - 1 + 1)) + 1);
    this.random = true;
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.textEncrypt = '';
    this.textDesencrypt = '';
    this.analysis = '';
  }
}
