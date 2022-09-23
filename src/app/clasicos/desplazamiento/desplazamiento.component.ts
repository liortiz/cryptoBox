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
  desplazamiento = {text:"",key:""}
  text: string;
  key: string;
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;



  constructor(private conection: DesplazamientoService, private formBuilder: FormBuilder) { 
    this.text = '';
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
    this.conection.getDesplazamientoE(this.desplazamiento.text,this.desplazamiento.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    console.log(this.random)
    this.desplazamiento = this.formDesplazamiento.getRawValue();
    if (this.random){
      this.desplazamiento.key = this.key
    }
    this.conection.getDesplazamientoD(this.desplazamiento.text,this.desplazamiento.key)
    .subscribe(data=>{
      this.textDesencrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formDesplazamiento.valid){
      this.desplazamiento = this.formDesplazamiento.getRawValue();
      console.log('analisis');
      this.conection.getDesplazamientoA(this.desplazamiento.text,this.desplazamiento.key)
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
}
