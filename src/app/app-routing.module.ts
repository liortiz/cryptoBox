import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ManualComponent } from './manual/manual.component';

const routes: Routes = [
  { path : "",component:HomeComponent},
  { path: "clasicos", loadChildren: () => import('./clasicos/clasicos.module').then(m => m.ClasicosModule) },
  { path: "bloque", loadChildren: () => import('./bloque/bloque.module').then(m => m.BloqueModule) },
  { path: "llave", loadChildren: () => import('./llave/llave.module').then(m => m.LlaveModule) },
  { path : "manual",component:ManualComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
