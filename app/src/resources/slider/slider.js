import {inject, bindable, noView} from 'aurelia-framework';
import $ from 'jquery';
import {Storage} from 'src/utils/storage';

@noView
@inject(Element)
export class Slider {

  @bindable label = '';
  @bindable value = '';
  @bindable min = 0;

  constructor(element) {
    this.storage = new Storage(); // doesn't like being injected ???
    this.$slider = $(element);
    this.$slider
      .attr('data-slider-value', this.value)
      .attr('data-slider-min', this.min)
      .attr('data-slider-max', 100)
      .attr('data-slider-orientation', 'horizontal')
      .attr('data-slider-selection', 'before')
      .slider().on('change', obj => {
      this.value = obj.value.newValue;
    });
  }

  valueChanged(newVal) {
    this.$slider.slider('setValue', parseInt(newVal));
    this.storage.setItem(this.label, newVal);
  }
}
