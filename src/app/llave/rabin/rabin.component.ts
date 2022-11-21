import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { rabinService } from 'src/app/servicios/llave/rabin.service';


@Component({
  selector: 'app-rabin',
  templateUrl: './rabin.component.html'
})
export class RabinComponent implements OnInit {

  formrabin: FormGroup;
  rabin = {text:'',n:'',p:'',q:''};
  textE: string = '';
  textD: string = '';
  n: string = '';
  p: string = '';
  q: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  error: string = '';

  constructor(private conection: rabinService, private formBuilder: FormBuilder) {
    this.formrabin = this.formBuilder.group({
      text:[""],
      pk:[""]
    })
   }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.rabin = this.formrabin.getRawValue();
    this.conection.getrabinE(this.rabin.text,this.rabin.n)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.rabin = this.formrabin.getRawValue();
    this.conection.getrabinD(this.rabin.text,this.rabin.p,this.rabin.q)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.n = '';
    this.p = '';
    this.q = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.error = ''
  }

}
