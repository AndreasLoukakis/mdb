import { Component, OnInit } from '@angular/core';
import { DbService } from './../../../services/db.service';
import { Collection } from './../../../models/collection.innterface';

import { first } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

import { OverlayService, createOverlayParams } from './../../../services/overlay.service';
import { MoviesService } from './../../../services/movies.service';
import { CollectionEditorComponent } from './../collection-editor/collection-editor.component';
import { Movie } from './../../../models/movie.interface';

@Component({
  selector: 'app-collection-container',
  templateUrl: './collection-container.component.html',
  styleUrls: ['./collection-container.component.scss']
})
export class CollectionContainerComponent implements OnInit {

  myCollections: Collection[]

  constructor(
    private db: DbService,
    private overlayService: OverlayService,
    private snack: MatSnackBar
  ) { }

  ngOnInit() {
    this.myCollections = this.db.getCollections();
  }

  showCollectionModal() {
    const config: createOverlayParams = {
      component: CollectionEditorComponent,
      instanceData: {},
      instanceMethods: {
        saveCb: (data) => { this.db.addNewCollection(data.title, data.description) }
      }
    }
    this.overlayService.createOverlay(config);
  }

}
