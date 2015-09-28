import {CameraDatamodel} from './camera-datamodel';
import {inject} from 'aurelia-framework';

@inject(CameraDatamodel)
export class ImageSettings {

  constructor(data) {
    this.imageSettings = data.imageSettings;
    this.sizes = data.size;
    this.flips = data.flips;
    this.isos = data.iso;
    this.compression = data.compression;
  }
}

