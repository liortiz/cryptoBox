import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesplazamientoComponent } from './desplazamiento/desplazamiento.component';

const routes: Routes = [
  { path: "desplazamiento", component: DesplazamientoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasicosRoutingModule { }