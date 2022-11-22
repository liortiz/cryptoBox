import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamalComponent } from './gamal/gamal.component';
import { Gamal2Component } from './gamal2/gamal2.component';
import { RabinComponent } from './rabin/rabin.component';
import { RsaComponent } from './rsa/rsa.component';


const routes: Routes = [
  { path: "rsa", component: RsaComponent},
  { path: "rabin", component: RabinComponent},
  { path: "gamal", component: GamalComponent},
  { path: "gamal2", component: Gamal2Component}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlaveRoutingModule { }