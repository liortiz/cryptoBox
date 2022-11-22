import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { hillService } from '../../servicios/clasicos/hill.service'
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-hill',
  templateUrl: './hill.component.html'
})
export class hillComponent implements OnInit {
  formhill: FormGroup;
  hill = {img: "",key:"",n:"",pt:"",ct:""}
  img: string = '';
  imgName: string = '';
  imgE: string = '';
  textA: string = '';
  key: string = '';
  n: string = '';
  pt: string = '';
  ct: string = '';
  psnrE: string = '';
  psnrD: string = '';
  analysis: string = '';
  random = false;
  errorM: string = '(This key must be a invertible matrix in Z26)';
  errorD: string = '(This key must be the dimention matrix)';
  constructor(private connection: hillService, private formBuilder: FormBuilder,private sanitizer: DomSanitizer) { 
    this.formhill = this.formBuilder.group({
      img:["",Validators.required],
      key:[""],
      n:[""],ct:[""],pt:[""]
    })
  }

  ngOnInit(): void {
  }

  capturarFile(event:any){
    this.img = event.target.files[0]
    this.extraerBase64(this.img).then((imagen: any) => {
      this.img = imagen.base;
    })
    this.hill = this.formhill.getRawValue();
    this.imgName = this.hill.img.split('\\')[2]
    this.imgE = ''
  }



  capturarValoresE(){        
    this.hill = this.formhill.getRawValue();
    console.log(this.hill)
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.gethillE(this.imgName,this.hill.key,this.hill.n)
    .subscribe(res=>{ 
      console.log(res)
      this.psnrE = res.psnr;
      this.imgE = '../../../assets/img/hillresultE.jpeg'  
    })
  }

  capturarValoresD(){
    this.hill = this.formhill.getRawValue();
    console.log(this.hill)
    this.imgE = '../../../assets/img/loading.gif'
    this.connection.gethillD(this.imgName,this.hill.key,this.hill.n)
    .subscribe(res=>{ 
      console.log(res)
      this.imgE = '../../../assets/img/hillresultD.jpeg'  
    })
  }
  
  capturarValoresA(){
    this.hill = this.formhill.getRawValue();
    console.log(this.hill)
    this.connection.gethillA(this.hill.pt,this.hill.ct)
    .subscribe(data=>{
      this.analysis = data.Analisis;
    })
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
    this.img = '';
    this.imgE = '';
    this.key = '';
    this.analysis = ''
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