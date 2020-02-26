var prod = process.env.NODE_ENV === 'production'
var path = require('path')
module.exports = {
  wpyExt: '.vue',
  eslint: true,
  cliLogs: true,
  resolve: {
    alias: {
        '@': path.join(__dirname, 'src') //配置文件路径代码
    },
  },
  compilers: {
    // less: {
    //   compress: true
    // },
    sass: {
      outputStyle: 'compressed'
    },
    babel: {
      sourceMap: true,
      'presets': [
        'env'
      ],
      'plugins': [
        'babel-plugin-transform-class-properties',
        'transform-export-extensions',
        'syntax-export-extensions'

      ]
    }
  },
  plugins: {
    px2units: {
      filter: /.wxss$/
    }
  },
  appConfig: {
    noPromiseAPI: ['createSelectorQuery']
  }
}

if (prod) {
  module.exports.cliLogs = false

  delete module.exports.compilers.babel.sourcesMap
  // 压缩sass
  module.exports.compilers['sass'] = {outputStyle: 'compressed'}

  // 压缩less
  // module.exports.compilers['less'] = {
  //   compress: true
  // }

  // 压缩js
  module.exports.plugins = {
    uglifyjs: {
      filter: /\.js$/,
      config: {
      }
    },
    px2units: {
        filter: /.wxss$/
    },
    imagemin: {
      filter: /\.(jpg|png|jpeg)$/,
      config: {
        jpg: {
          quality: 80
        },
        png: {
          quality: 80
        }
      }
    }
  }
}
