![Hackathon Starter+](/../screenshots/hackathon-starter-plus.png?raw=true "Hackathon Starter+")
Hackathon Starter+
=======================

This is a project which builds off the foundations of a node.js boilerplate called [Hackathon Starter](https://github.com/sahat/hackathon-starter).

Hackathon Starter focuses on providing a simple and easy to use node.js boilerplate for you to hit the ground running.
However, if you want to take your app to production, there are a few changes you will want to make to the boilerplate 
to take it beyond a hackathon project.  
Also, since Hackathon Starter is intended for everyone (including beginners), there are certain things that will never 
be included out of the box, such as Socket.io (websockets) support.

Hackathon Starter+ aims to provide a **post hackathon guide** so that you can take your projects to the next level.

Table of Contents
-----------------

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [License](#license)

Features
--------

- **Asset Pipeline** using Laravel Mix, Webpack with styles and scripts project skeleton structure
- **Websocket Support** via Socket.io

Prerequisites
-------------
You need to have an existing Hackathon Starter project in place (existing or new).  
See [Getting Started](https://github.com/sahat/hackathon-starter#getting-started) within the Hackathon Starter 
documentation.


Getting Started
---------------
If you intend to use any of the files included with Hackathon Starter+, I highly recommend that you **don't** clone 
this repo into your current Hackathon Starter project.  
Instead, download the `.zip` file of this repo or just manually adjust/create the files where needed in your project 
and `copy & paste` over whatever pieces you want.

**Remember:** Make sure that you copy/rename `.env.example` to `.env` and populate the environment variables with your own 
keys/secrets.

Asset Pipeline
--------------
We're going to continue to use Bootstrap 4, Font-Awesome etc. however, what we want is to be able to build a 
production-ready version of our app that utilises some best practices, such as: 
- Development vs Production: Handle development assets differently from production assets.
- Filename Fingerprinting: Each client-side file will get have a unique string of characters added to the filename.
Whenever the contents of a file changes, the fingerprinted filename for production will also change. This will provide
us with a good cache-busting solution.
- Sass File Location: Sass files are moved out of the `public` directory so that no one can access our source Sass 
files.
- Client-side JavaScript: Provide a good initial structure for your custom JavaScript code using the [module revealing 
pattern](https://toddmotto.com/mastering-the-module-pattern/).
- Code Splitting: separate our vendor (3rd party) JavaScript dependencies from our own custom JavaScript code.
- Pre-built Assets: All Sass and JavaScript files are processed by Webpack in advance and not at runtime (as is 
the case with Sass middleware using the default Hackathon Starter setup).

### What To Remove

**Note:** Line locations may vary based on what you have added/removed.

`npm uninstall jquery node-sass node-sass-middleware --save`

**Delete these folders:**  
`public/css`  
`public/js`  
`public/webfonts`  

Open `app.js` at the top level of your project and remove *line 20* and the middleware shown below from *lines 66-69*
```javascript
app.use(sass({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public')
}));
```

### What To Add

**Note:** Line locations may vary based on what you have added/removed.

`npm install bootstrap glob-all jquery laravel-mix popper.js purge-webpack-plugin tooltip.js simple-pjax 
@fortawesome/fontawesome @fortawesome/fontawesome-free-webfonts --save-dev`

Copy the `assets` folder from this repo to your project.  
Copy the `.gitignore` file from this repo to your project.
Copy the `.webpack.mix.js` file from this repo to your project.

We now need to modify our app to handle development and production assets as the file names will be different.  
In `app.js` (where we create our Express server), in between lines *64* and *65* 
(after `app.set('view engine', 'pug');`), add the following:
```javascript
// Middleware for Jade/Pug custom filter for use with Laravel Mix
app.use((req, res, next) => {
  app.locals.filters = {
    'mix': (text, options) => {
      if (!text) return
      text = text.replace(/["']/g, '')

      const manifest = require(__dirname + '/public/mix-manifest.json')
      if (options.css) return `<link rel="stylesheet" href="${manifest[text]}">`
      if (options.js) return `<script type="text/javascript" src="${manifest[text]}"></script>`
    }
  }
  next()
})
```

In `views/layout.pug` replace *line 11* with 
```pug
:mix(css) '/assets/styles/app.css'
```

At *line 25* add
```pug
:mix(js) '/assets/scripts/manifest.js'
:mix(js) '/assets/scripts/vendor.js'
:mix(js) '/assets/scripts/app.js'
```

Now that our app is updated, we just need to update how we run these new tasks.
Open the `package.json` file at the top level of the project and replace the `scripts` section with the below:  

```json
"scripts": {
    "start": "node app.js",
    "dev": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "watch": "cross-env NODE_ENV=development node_modules/webpack/bin/webpack.js --watch --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "hot": "cross-env NODE_ENV=development webpack-dev-server --inline --hot --config=node_modules/laravel-mix/setup/webpack.config.js",
    "production": "NODE_ENV=production node_modules/webpack/bin/webpack.js --progress --hide-modules --config=node_modules/laravel-mix/setup/webpack.config.js",
    "prod": "npm run production",
    "test": "nyc mocha --timeout=3000 --exit",
    "lint": "eslint **/*.js"
  },
```

- `simple-pjax` is included by default to provide an experience that feels more like a single page app. You can
read more about it [here](https://github.com/Mitranim/simple-pjax).  
- If you are not going to use Websockets with Socket.io, feel free to remove references to socket.io from 
`assets/scripts/app.js`.  
- Perhaps consider renaming `app.js` at the top level of the project to `server.js` so that you don't get confused 
between our server file and client-side JavaScript file with the same name. Also remember to update the `start` task 
within the `scripts` block in `package.json` if you do rename the file. Eg. `"start": "node server.js",`

If you are unsure of these changes, please see the example files within this repo for reference.

#### Development
When developing, it's best to have two terminal windows open. One window will be running your asset pipeline, watching 
for changes and recompiling when necessary. The other window will have the Express server running (make sure you've 
already started MongoDB). Also note, it's worthwhile to use [Nodemon](https://github.com/remy/nodemon) to start your 
server as it will automatically detect changes and restart your server for you.  
If you opt to use Nodemon, replace `"start": "node app.js",` with `nodemon app.js`.

In the first terminal window, run `npm start`.  
In the second terminal run `npm run watch`. This will watch our Sass files and our client-side JavaScript for changes 
and automatically recompile when needed.

#### Production
To compile your assets for production, run `npm run prod` and production ready versions of your assets will be 
output in the `public` directory. Be sure to deploy these files.

Websocket Support
--------------

**Note:** Line locations may vary based on what you have added/removed.

### What To Add
`npm install socket.io --save`

There's a few pieces to be added to `app.js` to add websocket support.  

Find this at *line 46*
```javascript
const app = express();
```

Add this after *line 46*
```javascript
/**
 * Create Express & Socket.io servers.
 */
const socketIoPort = 3001
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(socketIoPort)
```

Find this at *line 65*
```javascript
app.use(expressStatusMonitor());
```

Replace with this:
```javascript
app.use(expressStatusMonitor({websocket: io, port: socketIoPort}))
```

Find this at *line 93*
```javascript
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});
```

Replace with this:
```javascript
app.use((req, res, next) => {
  // Construct url to socket.io (port 3001). Slice port number where not needed.
  res.locals.hostname = process.env.BASE_URL.slice(0, -5) || req.protocol + '://' + req.hostname
  res.locals.fullHostname = process.env.BASE_URL || req.protocol + '://' + req.hostname + ':' + req.app.settings.port
  res.locals.user = req.user
  next()
})
```

At *line 227* add
```javascript
/**
 * Socket.io.
 */
io.on('connection', (socket) => {
  socket.emit('greet', {hello: 'Hey there browser!'})
  socket.on('respond', (data) => {
    console.log(data)
  })
  socket.on('disconnect', () => {
    console.log('Socket disconnected')
  })
})
```

The following piece of jQuery will listen for a connection to our Socket.io server. Once established it will then 
listen for the `greet` event and emit a `respond` event when a `greet` event is received.

```javascript
$(document).ready(function () {
  // init socket.io
  const socket = io.connect(window.location.hostname + ':3001')
  socket.on('greet', (data) => {
    console.log(data)
    socket.emit('respond', { message: 'Hey there, server!' })
  })
})
```

To summarise: When a websocket connection is established, our server emits a `greet` event over websockets with a 
message saying "Hey there browser!" and when our browser receives this event, it logs what was sent from the server 
to its (the browser's) console.  
We then emit an event from the client called `respond` and when the server receives this event, it logs the message 
(on the server) that was sent, in this case "Hey there, server!"

Contributing
------------

If something is unclear, confusing, or needs to be refactored, please let me know.  
Pull requests are always welcome, but due to the opinionated nature of this project, I cannot accept every pull 
request. Please open an issue before submitting a pull request.  
This project uses [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) with a few minor exceptions.  
If you are submitting a pull request that involves Pug templates, please make sure you are using *spaces*, not tabs.

License
-------

The MIT License (MIT)  
Copyright (c) 2018 Niall O'Brien  
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
