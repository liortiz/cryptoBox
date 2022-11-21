import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { rsaService } from 'src/app/servicios/llave/rsa.service';


@Component({
  selector: 'app-rsa',
  templateUrl: './rsa.component.html'
})
export class RsaComponent implements OnInit {

  formrsa: FormGroup;
  rsa = {text:'',pk:''};
  textE: string = '';
  textD: string = '';
  pk: string = '';
  textEncrypt: string = '';
  textDecrypt: string = '';
  error: string = '';

  constructor(private conection: rsaService, private formBuilder: FormBuilder) {
    this.formrsa = this.formBuilder.group({
      text:[""],
      pk:[""]
    })
   }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.rsa = this.formrsa.getRawValue();
    this.conection.getrsaE(this.rsa.text,this.rsa.pk)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.rsa = this.formrsa.getRawValue();
    this.conection.getrsaD(this.rsa.text,this.rsa.pk)
    .subscribe(data=>{
      this.textDecrypt = data.TextoDesencriptado;
    },
    error=>console.log(error))
  }

  reset(){
    this.textE = '';
    this.textD = '';
    this.pk = '';
    this.textEncrypt = '';
    this.textDecrypt = '';
    this.error = ''
  }

}
