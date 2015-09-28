import {inject} from 'aurelia-framework';
import {HttpClient} from 'aurelia-http-client';
import {APP_CONFIG} from 'src/app-config';

@inject(HttpClient)
export class Dataservice {

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  doShutterPress(payload) {
    return this.httpClient.createRequest()
      .asGet()
      .withBaseUrl(APP_CONFIG.BERRYCAM_URL)
      .withParams(payload)
      .send();
  }
}
