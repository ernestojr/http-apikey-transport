const Transport = require('winston-transport')
const request = require('request-promise')

module.exports = class HttpApikeyTransport extends Transport {
  constructor(opts) {
    super(opts)
    this.uri = opts.uri
    this.apikey = opts.apikey
    this.service = opts.service
  }
  log(level, msg, meta, callback) {
    if (typeof meta === 'function') {
      callback = meta;
      meta = {};
    }
    var options = {
      uri: this.uri,
      apikey: this.apikey,
      data: {
        service: this.service,
        level: level,
        message: msg,
        meta: meta
      }
    }
    if (meta) {
      if (meta.uri) {
        options.uri = meta.uri;
        delete meta.uri;
      }
      if (meta.apikey) {
        options.apikey = meta.apikey;
        delete meta.apikey;
      }
    }
    query(options)
    .then(result => {
      if (callback) setImmediate(callback)
    })
    .catch(err => console.error(err))
  }
}

function query(opts) {
  const options = {
      method: 'POST',
      uri: opts.uri,
      body: opts.data,
      json: true,
      headers: {
        apikey: opts.apikey
      }
  }
  return new Promise((resolve, reject) => {
    request(options).then(resolve).catch(reject)
  })
}
