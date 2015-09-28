import {bindable, inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';

@inject(EventAggregator)
export class ActivityIndicator {

  @bindable isActive = false;

  constructor(eventAggregator) {
    this.eventAggregator = eventAggregator;
    this.subscribe();
  }

  subscribe() {
    this.eventAggregator.subscribe('ACTIVITY:RUNNING', payload => {
      this.isActive = payload;
    });
  }
}
