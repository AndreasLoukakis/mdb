import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../common/shared.module';

import { SearchRoutingModule } from './search-routing.module';
import { SearchContainerComponent } from './search-container/search-container.component';
import { ItemContainerComponent } from './item/item-container.component';
import { ItemComponent } from './item/item.component';


@NgModule({
  declarations: [
    SearchContainerComponent,
    ItemContainerComponent,
    ItemComponent
  ],
  imports: [
    CommonModule,
    SearchRoutingModule,
    SharedModule
  ],
  entryComponents: [ItemComponent]
})
export class SearchModule { }
