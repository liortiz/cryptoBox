import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Gamal2Service } from 'src/app/servicios/llave/gamal2.service';


@Component({
  selector: 'app-gamal2',
  templateUrl: './gamal2.component.html'
})
export class Gamal2Component implements OnInit {

  formgamal2: FormGroup;
  gamal2 = {textE:'',textD:'',p:'',a:'',b:'',k:'',key:''};
  textE: string = '';
  textD: string = '';
  p: string = '';
  a: string = '';
  b: string = '';
  k: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  error: string = '';
  primes = [1];

  constructor(private conection: Gamal2Service, private formBuilder: FormBuilder) {
    this.formgamal2 = this.formBuilder.group({
      textE:[""],textD:[""],
      p:[""],
      a:[""],
      b:[""],
      key:[""],
      k:[""]
    })
   }

  ngOnInit(): void {
  }

  

  capturarValoresE(){
    this.gamal2 = this.formgamal2.getRawValue();
    this.conection.getgamal2E(this.gamal2.p,this.gamal2.a,this.gamal2.b,this.gamal2.key,this.gamal2.k,this.gamal2.textE)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
      this.p = data.p;
      console.log(data)
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.gamal2 = this.formgamal2.getRawValue();
    this.conection.getgamal2D(this.gamal2.p,this.gamal2.a,this.gamal2.b,this.gamal2.key,this.gamal2.k,this.gamal2.textD)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
    console.log('this.textDecrypt'),
    console.log(this.textDecrypt)
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.p = '';
    this.a = '';
    this.b = '';
    this.k = '';
    this.key = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.error = ''
  }

  generarLlave(){
  }
  getRandomKey(){

  }

  randomKey(){

  }

}
