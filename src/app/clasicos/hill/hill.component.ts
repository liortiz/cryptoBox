import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { hillService } from '../../servicios/clasicos/hill.service'

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html'
})
export class hillComponent implements OnInit {

  formhill: FormGroup;
  hill = {text:"",key:"",plain_text:"",cipher_text:""}
  textE: string;
  textD: string;
  textA: string;
  key: string;
  plain_text: string;
  cipher_text: string;
  textEncrypt: string = '';
  textDecrypt: string = '';
  analysis: string = '';
  random = false;
  img: string = '';
  imgE: string = ''



  constructor(private connection: hillService, private formBuilder: FormBuilder) { 
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.plain_text = '';
    this.cipher_text = '';
    this.formhill = this.formBuilder.group({
      text:[""],
      key:[""],
      plain_text:[""],
      cipher_text:[""],
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.hill = this.formhill.getRawValue();
    if (this.random){
      this.hill.key = this.key
    }
    this.img = '../../../assets/img/' + this.hill.text + '.jpg'
    this.connection.gethillE(this.hill.text,this.hill.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
      
    },
    error=>console.log(error))
    this.imgE = '../../../assets/img/' + this.hill.text + 'E.jpg'
  }

  capturarValoresD(){
    this.hill = this.formhill.getRawValue();
    if (this.random){
      this.hill.key = this.key
    }
    this.connection.gethillD(this.hill.text,this.hill.key)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formhill.valid){
      this.hill = this.formhill.getRawValue();
      this.connection.gethillA(this.hill.text,this.hill.plain_text,this.hill.cipher_text)
      .subscribe(data=>{
        console.log(data.Analisis)
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.key = String(Math.floor(Math.random() * (26 - 1 + 1)) + 1);
    this.random = true;
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.plain_text = '';
    this.cipher_text = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.analysis = '';
  }
}
