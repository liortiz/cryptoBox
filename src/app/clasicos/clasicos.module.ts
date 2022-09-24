import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { DesplazamientoComponent } from './desplazamiento/desplazamiento.component';
import { ClasicosRoutingModule } from './clasicos-routing.module';
import { AfinComponent } from './afin/afin.component';
import { hillComponent } from './hill/hill.component';
import { permutacionComponent } from './permutacion/permutacion.component';
import { sustitucionComponent } from './sustitucion/sustitucion.component';
import { vigenereComponent } from './vigenere/vigenere.component';



@NgModule({
  declarations: [
    DesplazamientoComponent,
    AfinComponent,
    hillComponent,
    permutacionComponent,
    sustitucionComponent,
    vigenereComponent
  ],
  imports: [
    CommonModule,
    ClasicosRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClasicosModule { }
