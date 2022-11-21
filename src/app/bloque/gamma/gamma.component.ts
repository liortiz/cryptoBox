import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GammaService } from 'src/app/servicios/bloque/gamma.service';

@Component({
  selector: 'app-gamma',
  templateUrl: './gamma.component.html'
})
export class GammaComponent implements OnInit {
  
  formgamma: FormGroup;
  gamma = {text:"",textE:"",x:"",y:"",p:""};
  text: string = '';
  textE: string = '';
  x: string = '';
  y: string = '';
  p: string = '';
  textEncrypt: string = '';
  textDesencrypt: string = '';
  percentage: string = '';
  img: string = '';

  constructor(private conection: GammaService, private formBuilder: FormBuilder) {
    this.formgamma = this.formBuilder.group({
      text:[""],textE:[""],
      x:[""],
      y:[""],
      p:[""]
    })
   }

  ngOnInit(): void {
  }

  capturarValoresE(){
    this.gamma = this.formgamma.getRawValue();
    this.conection.getgammaE(this.gamma.text,this.gamma.x,this.gamma.y,this.gamma.p)
    .subscribe(data=>{
      this.textEncrypt = data.TextoEncriptado;
      this.percentage = data.porcentaje;
      this.img = '../../../assets/img/gp.png'
    },
    error=>console.log(error))
  }

  capturarValoresD(){
    this.gamma = this.formgamma.getRawValue();
    this.conection.getgammaD(this.gamma.textE,this.gamma.x,this.gamma.y,this.gamma.p)
    .subscribe(data=>{
      this.textDesencrypt = data.TextoDesncriptado;
      console.log(data,data.TextoDesncriptado)
    },
    error=>console.log(error))
  }
  
}
