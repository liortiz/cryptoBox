import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { rsaService } from 'src/app/servicios/llave/rsa.service';


@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html'
})
export class RsaComponent implements OnInit {

  formrsa: FormGroup;
  rsa = {text:'',pke:'',pkd:'',fprime:'',sprime:''};
  textE: string = '';
  textD: string = '';
  pke: string = '';
  pkd: string = '';
  fprime: string = '';
  sprime: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  error: string = '';
  primes = [1];

  constructor(private conection: rsaService, private formBuilder: FormBuilder) {
    this.formrsa = this.formBuilder.group({
      text:[""],
      pke:[""],pkd:[""],
      fprime:[""],
      sprime:[""]
    })
   }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.rsa = this.formrsa.getRawValue();
    this.conection.getrsaE(this.rsa.text,this.rsa.pke)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.rsa = this.formrsa.getRawValue();
    this.conection.getrsaD(this.rsa.text,this.rsa.pkd)
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
    this.pke = '';
    this.pkd = '';
    this.fprime = '';
    this.sprime = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.error = ''
    this.key = '';
  }

  generarLlave(){
    console.log(this.rsa.fprime,this.rsa.sprime)
    this.rsa = this.formrsa.getRawValue();
    this.conection.getrsaK(this.rsa.fprime,this.rsa.sprime)
    .subscribe(data=>{
      this.key = data.key;
    },
    error=>console.log(error))
  }

  randomKey(){
    this.primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97,
      101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 151, 157, 163, 167, 173, 179, 181, 191, 193, 197,
      199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293, 307, 311, 313,
      317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 383, 389, 397, 401, 409, 419, 421, 431, 433, 439,
      443, 449, 457, 461, 463, 467, 479]
    const i1 = Math.floor(Math.random() * this.primes.length);
    this.fprime = this.primes[i1].toString();
    this.primes.slice(i1, 1);
    const i2 = Math.floor(Math.random() * this.primes.length);
    this.sprime = this.primes[i2].toString();
  }

}
