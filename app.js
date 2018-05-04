/**
 * Module dependencies.
 */
const express = require('express')
const compression = require('compression')
const session = require('express-session')
const bodyParser = require('body-parser')
const logger = require('morgan')
const chalk = require('chalk')
const errorHandler = require('errorhandler')
const lusca = require('lusca')
const dotenv = require('dotenv')
const MongoStore = require('connect-mongo')(session)
const flash = require('express-flash')
const path = require('path')
const mongoose = require('mongoose')
const passport = require('passport')
const expressValidator = require('express-validator')
const expressStatusMonitor = require('express-status-monitor')
const multer = require('multer')
const upload = multer({dest: path.join(__dirname, 'uploads')})

/**
 * Load environment variables from .env file, where API keys and passwords are configured.
 */
dotenv.load({path: '.env.example'})

/**
 * Controllers (route handlers).
 */
require('./controllers/home')
require('./controllers/user')
require('./controllers/api')
require('./controllers/contact')

/**
 * API keys and Passport configuration.
 */
const passportConfig = require('./config/passport')

/**
 * Create Express & Socket.io servers.
 */
const socketIoPort = 3001
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(socketIoPort)

/**
 * Connect to MongoDB.
 */
mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGODB_URI)
mongoose.connection.on('error', (err) => {
  console.error(err)
  console.log('%s MongoDB connection error. Please make sure MongoDB is running.', chalk.red('✗'))
  process.exit()
})

/**
 * Express configuration.
 */
app.set('host', process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0')
app.set('port', process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 1337)
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// Middleware for Pug custom filter for use with Laravel Mix
app.use((req, res, next) => {
  app.locals.filters = {
    'mix': (text, options) => {
      if (!text) return
      text = text.replace(/["']/g, '')

      const manifest = require(__dirname + '/public/mix-manifest.json')
      if (Object.keys(options)[0] === 'css') return `<link rel="stylesheet" href="${manifest[text]}">`
      if (Object.keys(options)[0] === 'js') return `<script type="text/javascript" src="${manifest[text]}"></script>`
    }
  }
  next()
})

app.use(expressStatusMonitor({websocket: io, port: socketIoPort}))
app.use(compression())
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use(expressValidator())

// By default the session cookie will expire on browser close.
// To set the session cookie to not expire anytime:
// https://stackoverflow.com/questions/18760461/nodejs-how-to-set-express-session-cookie-not-to-expire-anytime
app.use(session({
  resave: true,
  saveUninitialized: true,
  secret: process.env.SESSION_SECRET,
  cookie: { maxAge: 1209600000 }, // two weeks in milliseconds
  store: new MongoStore({
    url: process.env.MONGODB_URI,
    autoReconnect: true,
  })
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use((req, res, next) => {
  if (req.path === '/api/upload') {
    next()
  } else {
    lusca.csrf()(req, res, next)
  }
})
app.use(lusca.xframe('SAMEORIGIN'))
app.use(lusca.xssProtection(true))
app.use((req, res, next) => {
  // provide host to construct url to socket.io (port 3001)
  res.locals.hostname = req.protocol + '://' + req.hostname
  res.locals.fullHostname = req.protocol + '://' + req.hostname + ':' + req.app.settings.port
  res.locals.user = req.user
  next()
})
app.use((req, res, next) => {
  // After successful login, redirect back to the intended page
  if (!req.user &&
    req.path !== '/login' &&
    req.path !== '/signup' &&
    !req.path.match(/^\/auth/) &&
    !req.path.match(/\./)) {
    req.session.returnTo = req.originalUrl
  } else if (req.user &&
    (req.path === '/account' || req.path.match(/^\/api/))) {
    req.session.returnTo = req.originalUrl
  }
  next()
})
app.use(express.static(path.join(__dirname, 'public'), {maxAge: 31557600000}))

/**
 * Primary app routes.
 */
require('./config/routes')(app, passport, passportConfig, upload)

/**
 * Error Handler.
 */
app.use(errorHandler())

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

/**
 * Start Express server.
 */
app.listen(app.get('port'), () => {
  console.log('%s App is running at http://localhost:%d in %s mode', chalk.green('✓'), app.get('port'), app.get('env'))
  console.log('  Press CTRL-C to stop\n')
})

module.exports = app
