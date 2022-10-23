import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AesService } from '../../servicios/bloque/aes.service'

@Component({
  selector: 'app-aes',
  templateUrl: './aes.component.html'
})
export class AesComponent implements OnInit {
  formAes: FormGroup;
  aes = {text:"",key:""}
  textE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must have every character once )'
  constructor(private connection: AesService, private formBuilder: FormBuilder) { 
    this.formAes = this.formBuilder.group({
      text:["",Validators.required],
      key:[""]
    })
  }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.aes = this.formAes.getRawValue();
    if (this.random){
      this.aes.key = this.key
      console.log(this.aes.key,this.aes.text)
    }
    this.connection.getAesE(this.aes.text,this.aes.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.aes = this.formAes.getRawValue();
    if (this.random){
      this.aes.key = this.key
    }
    this.connection.getAesD(this.aes.text,this.aes.key)
    .subscribe(data=>{
      this.textDesencrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formAes.valid){
      this.aes = this.formAes.getRawValue();
      this.connection.getAesA(this.aes.text,this.aes.key)
      .subscribe(data=>{
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.key =""
    var alphabet = "qwertyuiopasdfghjklzxcvbnm".split("")
    while (alphabet.length != 0){
    this.key += alphabet.splice(Math.floor(Math.random() * alphabet.length),1).toString()
    this.key.replace(",","")
    }
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
    this.error = '(This key must have every char once)'
  }

  checkValidKey(){
    var a, x;
    a = this.key;
    x = false;

    if(Number.isNaN(Number(this.key))){
    for (var i = 97, _pj_a = 123; i < _pj_a; i += 1) {
      a = a.replace(String.fromCharCode(i), "");}
      if (a.length !== 0) {
        this.error = '(Remember: This key must have every char once)'
      }else{
        this.error = ""
      }}else if(this.key != ''){
      this.error = '(Remember: This key is not numeric, it must have every char once)'
    }
  }
}

