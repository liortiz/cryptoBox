import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path : "",component:HomeComponent},
  { path: "clasicos", loadChildren: () => import('./clasicos/clasicos.module').then(m => m.ClasicosModule) },
  { path: "bloque", loadChildren: () => import('./bloque/bloque.module').then(m => m.BloqueModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
