import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { GamalService } from 'src/app/servicios/llave/gamal.service';


@Component({
  selector: 'app-gamal',
  templateUrl: './gamal.component.html'
})
export class GamalComponent implements OnInit {

  formgamal: FormGroup;
  gamal = {textE:'',textD:'',q:'',h:'',g:'',p:'',key:''};
  textE: string = '';
  textD: string = '';
  q: string = '';
  h: string = '';
  g: string = '';
  p: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  error: string = '';
  primes = [1];

  constructor(private conection: GamalService, private formBuilder: FormBuilder) {
    this.formgamal = this.formBuilder.group({
      textE:[""],textD:[""],
      q:[""],
      h:[""],
      g:[""],
      key:[""],
      p:[""]
    })
   }

  ngOnInit(): void {
  }

  

  capturarValoresE(){
    this.gamal = this.formgamal.getRawValue();
    console.log(this.gamal.q,this.gamal.h,this.gamal.g)
    this.conection.getgamalE(this.gamal.textE,this.gamal.q,this.gamal.h,this.gamal.g)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
      this.p = data.p;
      console.log(data)
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.gamal = this.formgamal.getRawValue();
    this.conection.getgamalD(this.gamal.textD,this.gamal.p,this.gamal.key,this.gamal.q)
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
    this.q = '';
    this.h = '';
    this.g = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.error = ''
  }

  generarLlave(){
  }
  getRandomKey(){
    this.conection.getgamalK()
    .subscribe(data=>{
      this.q = data.q;
      this.g = data.g;
      this.key = data.k;
      this.h = data.h
    },
    error=>console.log(error))

  }

  randomKey(){

  }

}
