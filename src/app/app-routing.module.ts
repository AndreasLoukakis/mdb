import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// route components
import { SearchContainerComponent } from './features/search/search-container/search-container.component';
import { ItemContainerComponent } from './features/search/item/item-container.component';

const routes: Routes = [
  { path: 'search', loadChildren: () => import(`./features/search/search.module`).then(m => m.SearchModule) },
  { path: '', redirectTo: '/search', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
