import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { VigenereService } from '../../servicios/clasicos/vigenere.service'

@Component({
  selector: 'app-vigenere',
  templateUrl: './vigenere.component.html'
})
export class vigenereComponent implements OnInit {

  formVigenere: FormGroup;
  vigenere = {text:"",key:""}
  textE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must be a number)'

  constructor(private connection: VigenereService, private formBuilder: FormBuilder) { 
    this.formVigenere = this.formBuilder.group({
      text:["",Validators.required],
      key:[""]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.vigenere = this.formVigenere.getRawValue();
    if (this.random){
      this.vigenere.key = this.key
    }
    this.connection.getVigenereE(this.vigenere.text,this.vigenere.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.vigenere = this.formVigenere.getRawValue();
    if (this.random){
      this.vigenere.key = this.key
    }
    this.connection.getVigenereD(this.vigenere.text,this.vigenere.key)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formVigenere.valid){
      this.vigenere = this.formVigenere.getRawValue();
      this.connection.getVigenereA(this.vigenere.text,this.vigenere.key)
      .subscribe(data=>{
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.connection.getVigenereRandom()
    .subscribe(data=>{
      this.key = data.Key;
    },
    error=>console.log(error)) 
    this.random = true;
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.analysis = '';
    this.error = '(This key must be a number)'
  }

  

}
