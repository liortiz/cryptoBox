import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DesplazamientoComponent } from './desplazamiento/desplazamiento.component';

const routes: Routes = [
  { path: "", component: DesplazamientoComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClasicosRoutingModule { }