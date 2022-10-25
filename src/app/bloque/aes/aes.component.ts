import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { LastValueFromConfig } from 'rxjs/internal/lastValueFrom';
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
  key: string ='';
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must have every character once )'
  constructor(private connection: AesService, private formBuilder: FormBuilder) { 
    this.formAes = this.formBuilder.group({
      text:["",Validators.required],
      key:[]
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
  

  getRandomKey(){
    var sizes = [16,24,32]
    this.key =""
    var alphabet = "qwertyuiopasdfghjklzxcvbnm1234567890".split("")
    let largo = sizes[Math.floor(Math.random()*2)]
    for (var i =0; i <largo ;i++ ){
    this.key += alphabet.splice(Math.floor(Math.random() * alphabet.length),1).toString()
  }
    this.key.replace(",","")
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
    this.error = '(This key must have 16, 24 or 32 characters )'
  }

  checkValidKey(){
    var sizes = [16,24,32]
    var largo = this.key.length
    if(sizes.indexOf(largo) ==-1){
      this.error = '(Remember: This key must have 16, 24 or 32 characters  )'
    }
    else{
      console.log("buena contraseña")
    }
  }

}

