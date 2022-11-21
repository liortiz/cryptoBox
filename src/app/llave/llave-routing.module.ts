import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GamalComponent } from './gamal/gamal.component';
import { RabinComponent } from './rabin/rabin.component';
import { RsaComponent } from './rsa/rsa.component';


const routes: Routes = [
  { path: "rsa", component: RsaComponent},
  { path: "rabin", component: RabinComponent},
  { path: "gamal", component: GamalComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LlaveRoutingModule { }