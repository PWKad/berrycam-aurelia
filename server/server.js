var app = require('express.io')(),
  events = require('events'),
  util = require("util"),
  envs = require('envs'),
  serveIndex = require('serve-index'),
  serveStatic = require('serve-static'),
  moment = require('moment'),
  fs = require('fs-extra'),
  mkdirp = require('mkdirp'),
  RaspiCam = require('raspicam'),
  _ = require("lodash"),
  baseFilename = 'berrycamimages',
  baseImageDirectory = __dirname + '/' + baseFilename,
  photosDirectory = baseFilename + '/' + 'photos',
  fileExtension = '.jpg',
  camera,
  IS_PRODUCTION_MODE,
  allowCrossDomain = function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', '*');
    next();
  };

function FakeRaspiCam(opts) {
  var self = this,
    dummyFilename = '/images/lion.jpg';

  opts.output = dummyFilename;

  this.start = function () {
    console.log('fake camera started', opts);
    _.delay(function () {
      self.stop();
    }, 1000);
  };

  this.stop = function () {
    console.log('fake camera stopped');
    self.emit('read', null, new Date().getTime(), dummyFilename);
    self.emit('exit');
  };
}

util.inherits(FakeRaspiCam, events.EventEmitter);

function buildCamera(opts, res) {

  var camera;

  if (IS_PRODUCTION_MODE) {
    camera = new RaspiCam(opts);
  } else {
    camera = new FakeRaspiCam(opts);
  }

  if (res) {
    // doing single photo
    camera.on('exit', function () {
      console.log('camera exit photo', moment().format());
      res.json({
        filename: opts.output
      });
    });
  } else {
    console.log('Operation %s not supported yet');
  }

  camera.on('start', function () {
    console.log('camera start', moment().format());
  });

  camera.on('stop', function () {
    console.log('camera stop ', moment().format());
  });

  camera.on('read', function (err, timestamp, filename) {
    console.log('camera read ', moment().format(), filename);
  });

  camera.on('error', function (er) {
    console.error(er.stack);
  });

  return camera;
}

function createOutputDirectory() {
  if (!fs.existsSync(baseImageDirectory)) {
    mkdirp.sync(baseImageDirectory, function (err) {
      if (err) {
        console.log('error creating directory', baseImageDirectory, err);
      }
    });
  }
}

// set up running environment - 'production' by default
app.set('environment', envs('NODE_ENV', 'production'));
IS_PRODUCTION_MODE = app.get('environment') === 'production';
console.log('Production mode', IS_PRODUCTION_MODE);

createOutputDirectory();

app.use(serveStatic(__dirname));
app.use('/berrycamimages', serveIndex('berrycamimages', {'icons': true}));
app.use(allowCrossDomain);

app.get('/berrycam', function (req, res) {

  var opts = req.query,
    mode = opts.mode;

  if (mode === 'photo') {
    opts.output = photosDirectory + '/' + moment().format() + fileExtension;
    camera = buildCamera(opts, res);
    camera.start();
  } else {
    console.log('Operation %s not supported yet', mode);
  }
});

app.get('*', function (req, res) {
  res.status(404).send('Resource not found');
});

app.use(function (err, req, res, next) {
  console.error('Error', err, req, res);
  if (req.xhr) {
    res.status(500).send('Error', err);
  } else {
    next(err);
  }
});

app.listen(3000, function () {
  console.log('B E R R Y C A M   E X P R E S S -- Listening on port 3000');
});
