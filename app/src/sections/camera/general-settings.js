import {CameraDatamodel} from './camera-datamodel';
import {inject} from 'aurelia-framework';

@inject(CameraDatamodel)
export class GeneralSettings {

  constructor(data) {
    this.reset = data.reset.bind(data);
  }
}

