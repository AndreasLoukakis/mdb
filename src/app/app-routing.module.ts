import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'search', loadChildren: () => import(`./features/search/search.module`).then(m => m.SearchModule) },
  { path: 'collections', loadChildren: () => import(`./features/collections/collections.module`).then(m => m.CollectionsModule) },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
