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
  aes = {img: "",key:"", mode:"", iv:"", ctr:""}
  img: string = '';
  imgName: string = '';
  imgE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  iv: string = '';
  ctr: string = '';
  modes: any = ['CTR','CBC','CFB','OFB'] 
  analysis: string = '';
  random = false;
  error: string = '(This key must have every character once )'
  constructor(private connection: AesService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { 
    this.formAes = this.formBuilder.group({
      img:["",Validators.required],
      key:[""],mode:[""], iv:[""], ctr:[""]
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
    this.connection.getAesE(this.imgName,this.aes.key,this.aes.mode,this.aes.iv,this.aes.ctr)
    .subscribe(res=>{ 
      console.log(res)
      this.imgE = '../../../assets/img/result.jpeg'  
    })
  }

  capturarValoresD(){
    this.aes = this.formAes.getRawValue();
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.getAesD(this.imgName,this.aes.key,this.aes.mode,this.aes.iv,this.aes.ctr)
    .subscribe(res=>{ 
      console.log('aes',res)
      this.imgE = '../../../assets/img/result.jpeg'  
    })
  }
  
  getRandomKey(){
    var sizes = [16,24,32]
    this.key =""
    this.iv = ""
    this.ctr = ""
    var alphabet = "qwertyuiopasdfghjklzxcvbnm".split("")
    var alphabet2 = "qwertyuiopasdfghjklzxcvbnm".split("")
    let largo = sizes[Math.floor(Math.random()*2)]
    for (var i =0; i <largo ;i++ ){
    this.key += alphabet.splice(Math.floor(Math.random() * alphabet.length),1).toString()
    if(i<8){
      this.iv += alphabet2[Math.floor(Math.random() * alphabet2.length)]
      this.ctr += alphabet2[Math.floor(Math.random() * alphabet2.length)]
    }
  }
  this.key.replace(",","")
  this.iv.replace(",","")
  this.ctr.replace(",","")
  this.error = ""
    this.random = true;
  }

  reset(){
    this.img = '';
    this.imgE = '';
    this.key = '';
    this.textD = '';
    this.textA = '';
    this.key = '';
    this.iv = '';
    this.ctr = '';
    this.analysis = '';
    this.error = '(This key must have 16, 24 or 32 characters )'
  }

  checkValidKey(){
    var sizes = [16,24,32]
    if(sizes.indexOf(this.key.length)== -1){
      this.error = 'Remember : (This key must have 16, 24 or 32 characters )'
    }
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