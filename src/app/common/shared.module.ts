import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule,
  MatButtonModule, MatIconModule, MatTableModule, MatPaginatorModule,
  MatSnackBarModule, MatProgressSpinnerModule, MatSelectModule, MatListModule
} from '@angular/material';

import { SearchAllowedCharsDirective } from './directives/search-allowed-chars.directive';
import { OverlayService } from './../services/overlay.service';

@NgModule({
  declarations: [
    SearchAllowedCharsDirective,
  ],
  imports: [
    FormsModule, HttpClientModule,
    MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatProgressSpinnerModule,
    MatSelectModule, MatListModule
  ],
  providers: [OverlayService],
  exports: [
    MatToolbarModule, MatMenuModule, MatFormFieldModule, MatInputModule, MatButtonModule,
    MatIconModule, MatTableModule, MatPaginatorModule, MatSnackBarModule, MatProgressSpinnerModule,
    FormsModule, HttpClientModule, MatSelectModule, MatListModule
  ]
})
export class SharedModule { }
