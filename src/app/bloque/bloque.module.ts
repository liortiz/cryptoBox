import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { BloqueRoutingModule } from './bloque-routing.module';
import { AesComponent } from './aes/aes.component';
import { SdesComponent } from './sdes/sdes.component';
import { TdesComponent } from './tdes/tdes.component';
import { GammaComponent } from './gamma/gamma.component';


@NgModule({
  declarations: [
    AesComponent,
    SdesComponent,
    TdesComponent,
    GammaComponent
  ],
  imports: [
    CommonModule,
    BloqueRoutingModule, 
    FormsModule,
    ReactiveFormsModule
  ]
})
export class BloqueModule { }
