import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-collection-editor',
  templateUrl: './collection-editor.component.html',
  styleUrls: ['./collection-editor.component.scss']
})
export class CollectionEditorComponent implements OnInit {

  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() save: EventEmitter<{ title: string, description: string }> = new EventEmitter();
  
  title: string;
  description: string;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    debugger
    this.save.emit({ title: this.title, description: this.description })
  }

  closeEditor() {
    this.close.emit();
  }

}
