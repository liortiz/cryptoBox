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
  textE: string;
  textD: string;
  textA: string;
  key: string;
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;



  constructor(private connection: PermutacionService, private formBuilder: FormBuilder) { 
    this.textE = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.formpermutacion = this.formBuilder.group({
      text:[""],
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
  }

  capturarValoresD(){
    this.permutacion = this.formpermutacion.getRawValue();
    if (this.random){
      this.permutacion.key = this.key
    }
  }
  
  capturarValoresA(){
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
    this.textDesencrypt = '';
    this.analysis = '';
  }
}
