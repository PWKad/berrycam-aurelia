import {CameraDatamodel} from './camera-datamodel';
import {CameraPayloadBuilder} from './camera-payload-builder';
import {inject, computedFrom} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Dataservice} from 'src/services/dataservice';
import {APP_CONFIG} from 'src/app-config';

@inject(CameraDatamodel, EventAggregator, Dataservice, CameraPayloadBuilder)
export class Camera {

  showingImageSettings = false;
  showingFxSettings = false;
  showingAdjustmentSettings = false;
  showingGeneralSettings = false;
  isBusy = false;

  constructor(data, eventAggregator, dataservice, payloadBuilder) {
    this.data = data;
    this.payloadBuilder = payloadBuilder;
    this.dataservice = dataservice;
    this.eventAggregator = eventAggregator;
    this.cameraSettings = data.cameraSettings;
    this.imageSettings = data.imageSettings;
    this.imageAdjustments = data.imageAdjustments;
    this.fx = data.fx;
    this.currentImageFullPath = APP_CONFIG.DEFAULT_IMAGE;
  }

  resetCameraSettings() {
    this.data.reset();
  }

  setActivityIsRunning(isRunning) {
    this.eventAggregator.publish('ACTIVITY:RUNNING', isRunning);
    this.isBusy = isRunning;
  }

  @computedFrom('currentImageFullPath')
  get formattedFileName() {
    return this.currentImageFullPath ? this.currentImageFullPath.split('/').pop() : '';
  }

  doShutterPress() {
    this.setActivityIsRunning (true);
    this.dataservice.doShutterPress(this.payloadBuilder.buildPayload())
      .then(result => {
        this.currentImageFullPath = APP_CONFIG.BERRYCAM_SERVER_URL + '/' + JSON.parse(result.response).filename;
        this.setActivityIsRunning (false);
      })
      .catch(() => {
        this.currentImageFullPath = APP_CONFIG.FAILURE_IMAGE;
        this.setActivityIsRunning (false);
      });
  }

  toggleImageSettings() {
    this.showingImageSettings = !this.showingImageSettings;
  }

  toggleFxSettings() {
    this.showingFxSettings = !this.showingFxSettings;
  }

  toggleAdjustmentSettings() {
    this.showingAdjustmentSettings = !this.showingAdjustmentSettings;
  }

  toggleGeneralSettings() {
    this.showingGeneralSettings = !this.showingGeneralSettings;
  }
}
