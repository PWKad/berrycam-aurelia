import {bindable} from 'aurelia-framework';
import $ from 'jquery';

export class Modal {

    @bindable showing = false;

    showingChanged() {
        $(this.modal).modal('toggle');
    }
}
