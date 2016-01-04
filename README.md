# Ripple | Features
[![Coverage Status](https://coveralls.io/repos/rijs/features/badge.svg?branch=master&service=github)](https://coveralls.io/github/rijs/features?branch=master)
[![Build Status](https://travis-ci.org/rijs/features.svg)](https://travis-ci.org/rijs/features)

Extend components with features

```html
<custom-form is="validatable">
```

Features are just components, and will be invoked on the element during a render in the same way as the base component. The base component will be invoked first and then any features specified (you can specify multiple features).

```js
ripple('base-component', function(){ this.innerHTML = 'foo' } )
ripple('feature', function(){ this.innerHTML += 'bar' } )
```

```html
<base-component is="feature">foobar<base-component>
```

Features may also contribute and mixin their own styles (just specify a [needs header](https://github.com/rijs/needs)). 