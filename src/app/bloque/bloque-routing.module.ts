import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AesComponent } from './aes/aes.component';
import { GammaComponent } from './gamma/gamma.component';
import { SdesComponent } from './sdes/sdes.component';
import { TdesComponent } from './tdes/tdes.component';


const routes: Routes = [
  { path: "aes", component: AesComponent },
  { path: "gamma", component: GammaComponent },
  { path: "sdes", component: SdesComponent },
  { path: "tdes", component: TdesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloqueRoutingModule { }