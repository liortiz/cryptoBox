import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { TdesService } from 'src/app/servicios/bloque/tdes.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-tdes',
  templateUrl: './tdes.component.html'
})

export class TdesComponent implements OnInit {
  formtdes: FormGroup;
  tdes = {img: "",key:"", mode:"", iv:"", ctr:""}
  img: string = '';
  imgName: string = '';
  imgE: string = '';
  textD: string = '';
  textA: string = '';
  key: string = '';
  iv: string = '';
  ctr: string = '';
  modes: any = ['ECB','CBC','CFB','OFB','CTR'] 
  analysis: string = '';
  random = false;
  error: string = '(This key must have every character once )'
  constructor(private connection: TdesService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { 
    this.formtdes = this.formBuilder.group({
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
    this.tdes = this.formtdes.getRawValue();
    this.imgName = this.tdes.img.split('\\')[2]
    this.imgE = ''
  }



  capturarValoresE(){        
    this.tdes = this.formtdes.getRawValue();
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.gettdesE(this.imgName,this.tdes.key,this.tdes.mode,this.tdes.iv,this.tdes.ctr)
    .subscribe(res=>{ 
      console.log(res)
      this.imgE = '../../../assets/img/result.jpeg'  
    })
  }

  capturarValoresD(){
    this.tdes = this.formtdes.getRawValue();
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.gettdesD(this.imgName,this.tdes.key,this.tdes.mode,this.tdes.iv,this.tdes.ctr)
    .subscribe(res=>{ 
      console.log('des',res)
      this.imgE = '../../../assets/img/result.jpeg'  
    })
  }
  
  capturarValoresA(){
    if(this.formtdes.valid){
      this.tdes = this.formtdes.getRawValue();
    }
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
      if(i<16){
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