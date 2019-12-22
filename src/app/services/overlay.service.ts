import { Injectable } from '@angular/core';

import { Overlay, ComponentType } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';

import { Subscription } from 'rxjs'
import { first } from 'rxjs/operators';


@Injectable()
export class OverlayService {

  saveSubscription: Subscription;
  closeSubscription: Subscription;

  constructor(private overlay: Overlay) { }
    
  createOverlay(params: createOverlayParams) {
    const overlayRef = this.overlay.create(params.overlayParams || { hasBackdrop: true }); // this needed as reference to close
    const ref = overlayRef.attach(new ComponentPortal(params.component));
    const closeCb = params.instanceMethods.closeCb;
    const saveCb = params.instanceMethods.saveCb;
    
    for (let prop in params.instanceData) {
      ref.instance[prop] = params.instanceData[prop];
    }
  
    this.closeSubscription = ref.instance.close.pipe(first()).subscribe(
      (val) => this.closeOverlay(overlayRef, closeCb)
    );

    this.saveSubscription = ref.instance.save.pipe(first()).subscribe(
      (val) => {
        saveCb(val);
        this.closeOverlay(ref, undefined)
      }
    );
  }

  closeOverlay(ref, cb) {
    if (this.saveSubscription) this.saveSubscription.unsubscribe();
    ref.detach();
    if (cb) cb();
  }

}

export interface createOverlayParams {
  component: ComponentType<any>;
  instanceData: {};
  instanceMethods?: {
    closeCb?: (val) => void,
    saveCb?: (val) => any
  };
  overlayParams?: {};
}

