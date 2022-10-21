import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { BloqueRoutingModule } from './bloque-routing.module';
import { AesComponent } from './aes/aes.component';


@NgModule({
  declarations: [
    AesComponent
  ],
  imports: [
    CommonModule,
    BloqueRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BloqueModule { }
