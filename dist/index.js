'use strict';

// -------------------------------------------
// Extend Components with Features
// -------------------------------------------
module.exports = function features(ripple) {
  if (!client) return;
  log('creating');
  ripple.render = render(ripple)(ripple.render);
  return ripple;
};

var render = function render(ripple) {
  return function (next) {
    return function (el) {
      var features = str(attr(el, 'is')).split(' ').map(from(ripple.resources)).filter(header('content-type', 'application/javascript')),
          css = str(attr('css')(el)).split(' ');

      features.filter(by('headers.needs', includes('[css]'))).map(key('name')).map(append('.css')).filter(not(is.in(css))).map(function (d) {
        return attr('css', (str(attr('css')(el)) + ' ' + d).trim())(el);
      });

      var node = next(el);

      return !node || !node.state ? undefined : (features.map(key('body')).map(function (d) {
        return d.call(node.shadowRoot || node, node.shadowRoot || node, node.state);
      }), node);
    };
  };
};

var log = require('utilise/log')('[ri/features]'),
    includes = require('utilise/includes'),
    client = require('utilise/client'),
    header = require('utilise/header'),
    append = require('utilise/append'),
    attr = require('utilise/attr'),
    from = require('utilise/from'),
    not = require('utilise/not'),
    str = require('utilise/str'),
    key = require('utilise/key'),
    by = require('utilise/by'),
    is = require('utilise/is');