'use strict';
var path = require('path');

// Default paths
var app = 'app';
var tmp = '.tmp';
var dist = 'dist';
var bowerDir = 'bower_components';

// Default paths in app folder
var data = 'data';
var fonts = 'fonts';
var images = 'images';
var scripts = 'scripts';
var styles = 'styles';
var views = 'views';

// Browser sync task config
module.exports.browserSync = {
  dev: {
    server: {
      baseDir: [app, tmp],
      routes: {
        '/bower_components': bowerDir
      }
    },
    notify: false,
    debugInfo: false,
    host: 'localhost'
  },
  dist: {
    server: {
      baseDir: dist
    },
    notify: false,
    debugInfo: false,
    host: 'localhost'
  }
};

// Build size task config
module.exports.buildSize = {
  src: dist + '/**/*',
  cfg: {
    title: 'build', 
    gzip: true
  }
};

// Clean task config
// Be carefull what you cleaning!
module.exports.clean = [tmp, dist];

// Copy fonts task config
module.exports.copyFonts = {
  src: path.join(app, fonts, '**/*'),
  dest: dist + '/fonts'
};

// Copy extras task config
module.exports.copyExtras = {
  src: [
    app + '/*.*',
    '!' + app + '/*.html'
  ],
  dest: dist,
  cfg: {
    dot: true
  }
};

// Deploy task config
// FTP settings are in .env file
module.exports.deploy = {
  src: dist + '/**',
  dev: {
    root: dist,
    hostname: process.env.FTP_DEV_HOSTNAME,
    username: process.env.FTP_DEV_USER,
    destination: process.env.FTP_DEV_DEST
  },
  dist: {
    root: dist,
    hostname: process.env.FTP_DIST_HOSTNAME,
    username: process.env.FTP_DIST_USER,
    destination: process.env.FTP_DIST_DEST
  }
};

// Images task config
module.exports.images = {
  src: path.join(app, images, '**/*'),
  dest: dist + '/images',
  cfg: {
    progressive: true,
    interlaced: true,
    svgoPlugins: [{cleanupIDs: false}]
  }
};

// Jade task config
module.exports.jade = {
  src: path.join(app, views, '*.jade'),
  dest: tmp,
  cfg: {
    pretty: true,
    compileDebug: false
  }
};

// JadeData task config
module.exports.jadeData = {
  src: path.join(app, views, data, '/**/*.json'),
  dest: app + '/views',
  dataName: 'data.json',
  dataPath: path.join(app, views, 'data.json')
};

// JSHint task config
module.exports.jshint = {
  src: [
    path.join(app, scripts,'**/*.js'), 
    path.join('!' + app, scripts,'plugins/**/*.js') // do not lint external plugins
  ],
  reporter: require('jshint-stylish')
};

// Modernizr task config
module.exports.modernizr = {
  src: [ 
    path.join(app, scripts,'**/*.js'),
    path.join(tmp, styles,'*.css')
  ],
  dest: path.join(app, scripts, 'vendor'),
  cfg: {
    silent: true
  }
};

// Styles task config
module.exports.styles = {
  src: app + '/styles/main.scss',
  dest: tmp +'/styles',
  sassCfg: {
    sourcemap: false,
    style: 'expanded',
    lineNumbers: true
  }, 
  autoprefixerCfg: {browsers: ['last 2 version']}
};

module.exports.useref = {
  src: tmp + '/*.html',
  dest: dist,
  assetsCfg: {
    searchPath : app
  },
  revManifestCfg: {merge: true}
};

// Watch task config
module.exports.watch = {
  styles: app +'/styles/**/*.scss',
  jade: [app +'/views/**/*.jade', app + '/views/data/**/*.json'],
  jshint: app + '/scripts/**/*.js',
  wiredep: 'bower.json' 
};

// Wiredep task config
module.exports.wiredep = {
  sass: {
    src: app + '/styles/*.scss',
    dest: app + '/styles',
    cfg: {
      ignorePath: '../../',
      overides: {}
    }
  },
  jade: {
    src: app + '/views/layouts/*.jade',
    dest: app + '/views/layouts',
    cfg: {
      exclude: ['bootstrap-sass-official', 'modernizr'],
      ignorePath: '../../',
      overides: {}
    }
  } 
}