// used for running against a live server back-end on the Pi
let berrycamServerUrl = window.location.origin;

// comment out above BERRYCAM_SERVER_URL and uncomment this one to run locally against the
// berrycam server back-end that uses a faked raspi-cam to deliver a hard-coded image
// start the server with node server.js NODE_ENV=dev
//
// let berrycamServerUrl = 'http://localhost:3000',

export const APP_CONFIG = {

  DEFAULT_IMAGE_DIMENSIONS: {
    width: 2592,
    height: 1944
  },

  BERRYCAM_SERVER_URL: berrycamServerUrl,

  BERRYCAM_URL: berrycamServerUrl + '/berrycam',

  EXIF: 'IFD1.Software=BerryCam -x EXIF.MakerNote=BerryCam -x EXIF.UserComment=BerryCam',

  IMAGE_SCALES: {
    Thumbnail: 12,
    Tiny: 4,
    Small: 2,
    Medium: 1.333,
    Large: 1
  },

  DEFAULT_IMAGE: '/images/giraffe.jpg',
  FAILURE_IMAGE: '/images/lion.jpg'
}
