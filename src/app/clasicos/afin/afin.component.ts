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
  textDecrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must be a number)'



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
      this.textDecrypt = data.TextoDesencriptado;
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
    this.conection.getafinRandom()
    .subscribe(data=>{
      var aux = data.Key.split(',');
      this.a = aux[0];
      this.b   = aux[1];
    },
    error=>console.log(error))
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
    this.textDecrypt = '';
    this.analysis = '';
    this.error = '(This key must be a number)'
  }
}
