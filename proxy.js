var Hapi = require('hapi');
var jwt = require('jsonwebtoken');
var requestApi = require('request');
var Boom = require('boom');
var Path = require('path');
var Inert = require('inert');

var server = new Hapi.Server({
  connections: {
    routes: {
      files: {
        relativeTo: Path.join(__dirname, '.')
      }
    }
  }
});

server.connection({ host: '0.0.0.0', port: 9000 });

server.register({
  register: require('h2o2')
}, function (err) {
  if (err) throw err;
  server.route({
    method: '*', path: '/api/{path*}', config: {
      payload: {
        maxBytes: 209715200
      },
      handler: {
        proxy: {
          mapUri: function (request, callback) {
            callback(null, 'http://cds-kl.de.empolis.com:8090/api/' + request.params.path, request.headers);
          },
          onResponse: function (err, res, request, reply) {
            if (err) throw err;
            reply(res);
          }
        }
      }
    }
  });
});

server.register(Inert, () => { });

server.route({
  method: '*',
  path: '/app/{param*}',
  handler: {
    directory: {
      path: '.',
      redirectToSlash: true,
      index: true
    }
  }
});

module.exports = server;