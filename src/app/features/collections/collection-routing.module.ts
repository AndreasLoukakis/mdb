import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CollectionContainerComponent } from './collection-container/collection-container.component';


const routes: Routes = [
  {
    path: '', component: CollectionContainerComponent, children: [
      // {
      //   path: ':Id', component: ItemContainerComponent
      // }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CollectionRoutingModule { }
