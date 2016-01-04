import { expect } from 'chai'
import components from 'rijs.components'
import precss from 'rijs.precss'
import core from 'rijs.core'
import data from 'rijs.data'
import css from 'rijs.css'
import fn from 'rijs.fn'
import features from './'

import time from 'utilise/time'
import noop from 'utilise/noop'
import raw from 'utilise/raw'

var container = document.createElement('div')
  , head = document.head
  , el1, el2, el3, clean

describe('Features', d => {

  before(() => (document.body.appendChild(container), clean = document.head.innerHTML))
  
  beforeEach(() => document.head.innerHTML = clean)

  after(() => document.body.removeChild(container))

  it('should extend component with feature', function(done) {
    container.innerHTML = '<foo-bar-1 is="featurable1">'

    var el = container.firstElementChild
      , ripple = features(precss(components(fn(css(data(core()))))))

    ripple('foo-bar-1', function() { this.innerHTML += 1 })
    ripple('featurable1', function() { this.innerHTML += 2 })

    time(40, d => expect(el.innerHTML).to.be.eql('12'))
    time(50, done)
  })

  it('should extend component with multiple features', function(done) {
    container.innerHTML = '<foo-bar-2 is="featurable2 featurable3">'

    var el = container.firstElementChild
      , ripple = features(precss(components(fn(css(data(core()))))))

    ripple('foo-bar-2', function() { this.innerHTML += 1 })
    ripple('featurable2', function() { this.innerHTML += 2 })
    ripple('featurable3', function() { this.innerHTML += 3 })

    time(40, d => expect(el.innerHTML).to.be.eql('123'))
    time(50, done)
  })

  it('should extend component with feature css', function(done) {
    container.innerHTML = '<foo-bar-3 is="featurable4">'

    var el = container.firstElementChild
      , ripple = features(precss(components(fn(css(data(core()))))))

    ripple('foo-bar-3', noop)
    ripple('featurable4.css', ':host {}')
    ripple('featurable4', noop, { needs: '[css]' })

    time(40, d => {
      expect(el.outerHTML).to.be.eql('<foo-bar-3 is="featurable4" css="featurable4.css"></foo-bar-3>')
      expect(raw('style', head).innerHTML.trim()).to.equal('[css~="featurable4.css"] {}')
    })
    time(50, done)
  })

})