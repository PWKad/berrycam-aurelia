import 'bootstrap';
import 'bootstrap-slider';
import 'bootstrap/css/bootstrap.css!';
import 'bootstrap-slider/css/bootstrap-slider.css!';
import 'styles/styles.css!';

export class App {
  configureRouter(config, router) {
    this.router = router;
    config.map([
      {route: ['', 'camera'], moduleId: 'src/sections/camera/camera', nav: true, title: 'Camera'}
    ]);
  }
}
