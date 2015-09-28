export class Storage {

  constructor() {
    this.storage = window.localStorage;
  }

  convertStringToBoolean(val) {
    if (val === 'true') {
      val = true;
    }
    if (val === 'false') {
      return false;
    }
    return val;
  }

  getItem(key) {
    return this.convertStringToBoolean(this.storage.getItem(key));
  }

  setItem(key, value) {
    this.storage.setItem(key, value);
  }
}
