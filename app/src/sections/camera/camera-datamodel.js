import {CameraSetting} from './camera-setting';
import {inject} from 'aurelia-framework';

export class CameraDatamodel {

  metering = new CameraSetting('Metering', ['Matrix', 'Average', 'Spot', 'Backlit']);

  whiteBalance = new CameraSetting('WB', ['Auto', 'Sun',
    'Cloud', 'Shade', 'Tungsten',
    'Fluorescent', 'Incandescent', 'Flash',
    'Horizon'], 'Auto');

  ev = new CameraSetting('EV', ['0 ', '+1', '+2', '+3',
    '+4', '+5', '+6',
    '+7', '+8', '+9',
    '+10', ' 0', '-1',
    '-2', '-3', '-4',
    '-5', '-6', '-7',
    '-8', '-9', '-10'], '0 ', ' +/-');

  exposure = new CameraSetting('Exposure', ['Auto', 'Night', 'Nightpreview', 'Backlight',
    'Spotlight', 'Sports', 'Snow',
    'Beach', 'Verylong', 'Fixedfps', 'Antishake', 'Fireworks'], 'Auto');

  sharpness = new CameraSetting('Sharpness', [], 11, -100);

  brightness = new CameraSetting('Brightness', [], 60);

  contrast = new CameraSetting('Contrast', [], 2, -100);

  saturation = new CameraSetting('Saturation', [], 4, -100);

  size = new CameraSetting('Size', ['Thumbnail', 'Tiny', 'Small', 'Medium', 'Large']);

  iso = new CameraSetting('ISO', ['100', '200', '400']);

  compression = new CameraSetting('Compression', [], 25);

  fx = new CameraSetting('FX', ['None', 'Negative', 'Solarise',
    'Posterise', 'Film', 'Blur', 'Saturation',
    'Sketch', 'Denoise', 'Emboss',
    'Oilpaint', 'Hatch', 'Gpen',
    'Pastel', 'Watercolour', 'Colourswap',
    'Washedout', 'Colourpoint', 'Colourbalance', 'Cartoon']);

  vflip = new CameraSetting('VFlip', ['On', 'Off'], 'Off');

  hflip = new CameraSetting('HFlip', ['On', 'Off'], 'Off');

  cameraSettings = [
    this.whiteBalance,
    this.metering,
    this.ev,
    this.exposure
  ];

  imageAdjustments = [
    this.sharpness,
    this.brightness,
    this.contrast,
    this.saturation
  ];

  imageSettings = [
    this.size,
    this.iso,
    this.compression,
    this.fx
  ];

  flips = [
    this.vflip,
    this.hflip
  ];

  reset() {
    Object.keys(this).forEach(key => {
      let prop = this[key];
      prop.reset && prop.reset();
    });
  }
}
