import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { DesplazamientoComponent } from './desplazamiento/desplazamiento.component';
import { ClasicosRoutingModule } from './clasicos-routing.module';



@NgModule({
  declarations: [
    DesplazamientoComponent
  ],
  imports: [
    CommonModule,
    ClasicosRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class ClasicosModule { }
