import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule ,FormsModule } from '@angular/forms';
import { RsaComponent } from './rsa/rsa.component';
import { RabinComponent } from './rabin/rabin.component';
import { GamalComponent } from './gamal/gamal.component';
import { LlaveRoutingModule } from './llave-routing.module';
import { Gamal2Component } from './gamal2/gamal2.component';



@NgModule({
  declarations: [
    RsaComponent,
    RabinComponent,
    GamalComponent,
    Gamal2Component
  ],
  imports: [
    CommonModule,
    LlaveRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class LlaveModule { }
