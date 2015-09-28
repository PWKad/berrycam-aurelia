import {inject} from 'aurelia-framework';
import {Storage} from 'src/utils/storage';

export class CameraSetting {

  constructor(label, values, defaultValue) {
    this.storage = new Storage(); // doesn't like being injected ???
    this.label = label;
    this.values = values || [];
    this.defaultValue = defaultValue || this.values[0];
    this.selectedValue = this.storage.getItem(this.label) || this.defaultValue;
    this.iconClass = 'icon-icon-' + this.label.toLowerCase();
  }

  setSelectedValue(val) {
    this.selectedValue = val;
    this.storage.setItem(this.label, val);
  }

  reset() {
    this.setSelectedValue(this.defaultValue);
  }

  increment() {
    let idx = this.values.indexOf(this.selectedValue);
    this.setSelectedValue(this.values[++idx % this.values.length]);
  }
}
