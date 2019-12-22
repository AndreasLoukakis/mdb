import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from './../../common/shared.module';
import { CollectionRoutingModule } from './collection-routing.module'
import { CollectionContainerComponent } from './collection-container/collection-container.component';
import { CollectionEditorComponent } from './collection-editor/collection-editor.component';



@NgModule({
  declarations: [CollectionContainerComponent, CollectionEditorComponent],
  imports: [
    CommonModule,
    CollectionRoutingModule,
    SharedModule
  ],
  entryComponents: [CollectionEditorComponent]
})
export class CollectionsModule { }
