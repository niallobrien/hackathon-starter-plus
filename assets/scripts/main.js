// See webpack.config.js for third-party JS loading instructions.

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
  // Initialise modules here...
  console.log('jQuery version: ' + jQuery.fn.jquery)
  Greetings.to('awesome developer')
<<<<<<< HEAD

  var socket = io.connect(window.location.hostname + ':3001')
  socket.on('greet', (data) => {
    console.log(data)
    socket.emit('respond', { message: 'Hey there, server!' })
  })

=======
>>>>>>> 664db7711412f3195cd7e0274c252f0ac02ffd25
})
