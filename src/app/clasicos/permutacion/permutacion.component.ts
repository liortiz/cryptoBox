import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PermutacionService } from '../../servicios/clasicos/permutacion.service'

@Component({
  selector: 'app-permutacion',
  templateUrl: './permutacion.component.html'
})
export class permutacionComponent implements OnInit {

  formpermutacion: FormGroup;
  permutacion = {text:"",key:""}
  textE: string='';
  textD: string='';
  textA: string='';
  key: string='';
  textEncrypt: string = '';
  textDecrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must be a number)'



  constructor(private connection: PermutacionService, private formBuilder: FormBuilder) { 
    this.formpermutacion = this.formBuilder.group({
      text:["",Validators.required],
      key:[""]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.permutacion = this.formpermutacion.getRawValue();
    if (this.random){
      this.permutacion.key = this.key
    }
    this.connection.getPermutacionE(this.permutacion.text,this.permutacion.key)
    .subscribe(data=>{
      console.log(data.TextoEncriptado);
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.permutacion = this.formpermutacion.getRawValue();
    if (this.random){
      this.permutacion.key = this.key
    }
    this.connection.getPermutacionD(this.permutacion.text,this.permutacion.key)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }
  
  capturarValoresA(){
    if(this.formpermutacion.valid){
      this.permutacion = this.formpermutacion.getRawValue();
      console.log('capturarValoresA()',this.permutacion.text);
     
      this.connection.getPermutacionA(this.permutacion.text,'012')
      .subscribe(data=>{
        this.analysis = data.Analisis;
      },
      error=>console.log(error))
    }
  }

  getRandomKey(){
    this.connection.getPermutacionRandom()
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
