import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path : "", redirectTo : "clasicos", pathMatch : "full"},
  { path: "clasicos", loadChildren: () => import('./clasicos/clasicos.module').then(m => m.ClasicosModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
