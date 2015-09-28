import {CameraDatamodel} from './camera-datamodel';
import {APP_CONFIG} from 'src/app-config';
import {inject} from 'aurelia-framework';
import moment from 'moment';

@inject(CameraDatamodel)
export class CameraPayloadBuilder {

  constructor(cameraData) {
    this.cameraData = cameraData;
  }

  createImageDimension(imageSize) {
    let scales = APP_CONFIG.IMAGE_SCALES;
    return {
      width: APP_CONFIG.DEFAULT_IMAGE_DIMENSIONS.width / scales[imageSize],
      height: APP_CONFIG.DEFAULT_IMAGE_DIMENSIONS.height / scales[imageSize]
    };
  }

  buildPayload() {
    let cameraData = this.cameraData,
      dimensions = this.createImageDimension(cameraData.size.selectedValue),
      opts = {
        w: dimensions.width,
        h: dimensions.height,
        exif: APP_CONFIG.EXIF,
        q: cameraData.compression.selectedValue,
        awb: cameraData.whiteBalance.selectedValue,
        mm: cameraData.metering.selectedValue,
        ev: parseInt(cameraData.ev.selectedValue.replace('+', '')),
        ex: cameraData.exposure.selectedValue,
        sh: cameraData.sharpness.selectedValue,
        br: cameraData.brightness.selectedValue,
        co: cameraData.contrast.selectedValue,
        sa: cameraData.saturation.selectedValue,
        ifx: cameraData.fx.selectedValue,
        ISO: cameraData.iso.selectedValue,
        t: 1000,
        mode: 'photo'
      };

    if (cameraData.vflip.selectedValue === 'On') {
      opts.vf = true;
    }

    if (cameraData.hflip.selectedValue === 'On') {
      opts.hf = true;
    }

    return opts;
  }
}
