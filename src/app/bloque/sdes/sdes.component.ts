import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { SdesService } from 'src/app/servicios/bloque/sdes.service';
@Component({
  selector: 'app-sdes',
  templateUrl: './sdes.component.html'
})

export class SdesComponent implements OnInit {

  formsdes: FormGroup;
  sdes = {text:"",key:""}
  textE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must be a number)'

  constructor(private connection: SdesService, private formBuilder: FormBuilder) { 
    this.formsdes = this.formBuilder.group({
      text:["",Validators.required],
      key:[""]
    })
  }  
  
  ngOnInit(): void {    
  }

  capturarValoresE(){
    this.sdes = this.formsdes.getRawValue();
    this.connection.getsdesE(this.sdes.text,this.sdes.key)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.sdes = this.formsdes.getRawValue();
    console.log(this.sdes)
    this.connection.getsdesD(this.sdes.text,this.sdes.key)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesncriptado;
      console.log(data)
    },
    error=>console.log(error))
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
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.analysis = '';
    this.error = '(This key must be a number)'
  }

  checkValidKey(){
    var numKey = Number(this.key)
    //console.log(typeof numKey)
    if(Number.isNaN(numKey)){
      this.error = '(Remember: This key must be a number)'
    }else if(this.key != ''){
      this.error = ''
    }
  }
}
