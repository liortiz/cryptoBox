import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { AesService } from '../../servicios/bloque/aes.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-aes',
  templateUrl: './aes.component.html'
})
export class AesComponent implements OnInit {
  formAes: FormGroup;
  aes = {img: "",key:""}
  img: string = '';
  imgName: string = '';
  imgE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  textEncrypt: string = '';
  textDesencrypt: string = '';
  analysis: string = '';
  random = false;
  error: string = '(This key must have every character once )'
  constructor(private connection: AesService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { 
    this.formAes = this.formBuilder.group({
      img:["",Validators.required],
      key:[""]
    })
  }

  ngOnInit(): void {
  }

  capturarFile(event:any){
    this.img = event.target.files[0]
    this.extraerBase64(this.img).then((imagen: any) => {
      this.img = imagen.base;
    })
    this.aes = this.formAes.getRawValue();
    this.imgName = this.aes.img.split('\\')[2]
    this.imgE = ''
  }



  capturarValoresE(){        
    this.aes = this.formAes.getRawValue();
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.getAesE(this.imgName,this.aes.key)
    .subscribe(res=>{ 
      this.imgE = '../../../assets/img/result.jpeg'  
    })
  }

  capturarValoresD(){
    this.aes = this.formAes.getRawValue();
    if (this.random){
      this.aes.key = this.key
    }
  }
  
  capturarValoresA(){
    if(this.formAes.valid){
      this.aes = this.formAes.getRawValue();
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
  }

  extraerBase64 = async ($event: any) => new Promise((resolve, reject) => {
    try {
      const unsafeImg = window.URL.createObjectURL($event);
      const image = this.sanitizer.bypassSecurityTrustUrl(unsafeImg);
      const reader = new FileReader();
      reader.readAsDataURL($event);
      reader.onload = () => {
        resolve({
          base: reader.result
        });
      };
      reader.onerror = error => {
        resolve({
          base: null
        });
      };
      return 1
    } catch (e) {
      return null;
    }
  })
}

