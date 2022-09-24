import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesplazamientoComponent } from './desplazamiento/desplazamiento.component';
import { AfinComponent } from './afin/afin.component';
import { hillComponent } from './hill/hill.component';
import { permutacionComponent } from './permutacion/permutacion.component';
import { sustitucionComponent } from './sustitucion/sustitucion.component';
import { vigenereComponent } from './vigenere/vigenere.component';


const routes: Routes = [
  { path: "afin", component: AfinComponent },
  { path: "desplazamiento", component: DesplazamientoComponent },
  { path: "hill", component: hillComponent },
  { path: "permutacion", component: permutacionComponent },
  { path: "sustitucion", component: sustitucionComponent },
  { path: "vigenere", component: vigenereComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasicosRoutingModule { }