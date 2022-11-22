import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { rabinService } from 'src/app/servicios/llave/rabin.service';


@Component({
  selector: 'app-rabin',
  templateUrl: './rabin.component.html'
})
export class RabinComponent implements OnInit {

  formrabin: FormGroup;
  rabin = {text:'',pke:'',pkd:'',fprime:'',sprime:''};
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

  constructor(private conection: rabinService, private formBuilder: FormBuilder) {
    this.formrabin = this.formBuilder.group({
      text:[""],
      pke:[""],pkd:[""],
      fprime:[""],
      sprime:[""]
    })
   }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.rabin = this.formrabin.getRawValue();
    this.conection.getrabinE(this.rabin.text,this.rabin.pke)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.rabin = this.formrabin.getRawValue();
    console.log(this.rabin.pkd)
    this.conection.getrabinD(this.rabin.text,this.rabin.pkd)
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
    console.log(this.rabin.fprime,this.rabin.sprime)
    this.rabin = this.formrabin.getRawValue();
    this.key = (parseInt(this.rabin.fprime) * parseInt(this.rabin.sprime)).toString()
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
