import {CameraDatamodel} from './camera-datamodel';
import {inject} from 'aurelia-framework';

@inject(CameraDatamodel)
export class FxSettings {

  constructor(data) {
    this.fxs = data.fx;
  }
}

