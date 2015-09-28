import {inject} from 'aurelia-framework';
import {CameraDatamodel} from './camera-datamodel';

@inject(CameraDatamodel)
export class AdjustmentSettings {

  constructor(data) {
    this.settings = data.imageAdjustments;
  }
}
