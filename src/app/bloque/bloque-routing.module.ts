import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AesComponent } from './aes/aes.component';


const routes: Routes = [
  { path: "aes", component: AesComponent },];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BloqueRoutingModule { }