import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { afinService } from '../../servicios/clasicos/afin.service'

@Component({
  selector: 'app-afin',
  templateUrl: './afin.component.html'
})
export class AfinComponent implements OnInit {

  formafin: FormGroup;
  afin = {text:"",a:"",b:"",fcl:"", fdl:"", scl:"", sdl:""}
  textE: string = '';
  textD: string = '';
  textA: string = '';
  a: string = '';
  b: string = '';
  fcl:string;fdl:string;scl:string;sdl:string
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;



  constructor(private conection: afinService, private formBuilder: FormBuilder) { 
    this.fcl = '';this.fdl = '';this.scl = '';this.sdl = ''
    this.formafin = this.formBuilder.group({
      text:[""],
      a:[""],
      b:[""],
      fcl:[""], fdl:[""], scl:[""], sdl:[""]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.afin = this.formafin.getRawValue();
    if (this.random){
      this.afin.a = this.a;
      this.afin.b = this.b
    }
    this.conection.getafinE(this.afin.text,this.afin.a,this.afin.b)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.afin = this.formafin.getRawValue();
    if (this.random){
      this.afin.a = this.a;
      this.afin.b = this.b
    }
    this.conection.getafinD(this.afin.text,this.afin.a,this.afin.b)
    .subscribe(data=>{
      this.textDesencrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formafin.valid){
      this.afin = this.formafin.getRawValue();
      this.conection.getafinA(this.afin.text,this.afin.fcl,this.afin.fdl,this.afin.scl,this.afin.sdl)
      .subscribe(data=>{
        console.log(data.Analisis)
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.a = String(Math.floor(Math.random() * (26 - 1 + 1)) + 1);
    this.b = String(Math.floor(Math.random() * (26 - 1 + 1)) + 1);
    // faltan las del analisis
    this.random = true;
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.a = '';
    this.b = '';
    this.fcl = '';this.fdl = '';this.scl = '';this.sdl = ''
    this.textEncrypt = '';
    this.textDesencrypt = '';
    this.analysis = '';
  }
}
