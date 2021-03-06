import 'bootstrap'
import pjax from 'simple-pjax'

import {Greetings} from './modules/greetings'

// Timeout before calling the loading indicator function. Set to 0 to disable.
pjax.indicateLoadAfter = 100

// Called when loading takes a while. Use it to display a custom loading indicator.
pjax.onIndicateLoadStart = function () {
  document.documentElement.style.opacity = 0.5
}

// Called when loading ends. Use it to hide a custom loading indicator.
pjax.onIndicateLoadEnd = function () {
  document.documentElement.style.opacity = null
}

document.addEventListener('simple-pjax-before-transition', () => {
  // perform cleanup
})

document.addEventListener('simple-pjax-after-transition', () => {
  // perform DOM mutations
})

$(document).ready(function () {
  console.log('jQuery version: ' + jQuery.fn.jquery)

  // init socket.io
  const socket = io.connect(window.location.hostname + ':3001')
  socket.on('greet', (data) => {
    console.log(data)
    socket.emit('respond', { message: 'Hey there, server!' })
  })

  // Example of module use...
  Greetings.to('awesome developer')

})
