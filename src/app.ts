import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import flash from 'connect-flash';
import passport from 'passport';
import cors from 'cors';
import db from './config/sequelize';
import router from './routes/index';
import connectDB from './config/connectDB';
import './config/passport';
import './config/passportGoogle';
import routerApi from './api/routes/index';

const app = express();
app.locals.email = 'me@myapp.com'
// Connect database
connectDB(db);
// Express configuration
app.use(cors());
app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('layout extractScripts', true);
app.set('layout extractStyles', true);
app.set('layout', 'layout/layout');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser('secret'));
app.use(session({
  secret: 'keyboardcat',
  resave: true,
  saveUninitialized: true,
  cookie: {
    maxAge: 1000 * 60 * 60
  }
}));
app.use(
  express.static(path.join(__dirname, '../public'), { maxAge: 31557600000 })
);
app.use(
  express.static(path.join(__dirname, '../node_modules'), { maxAge: 31557600000 })
);
// config passport
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function (req, res, next) {
  var flash = req.flash();
  res.locals.messages = Object.keys(flash).reduce(function (messages, type) {
    flash[type].forEach(function (message) {      
      messages[type] = message;
    });
    return messages;
  }, {});
  next();
});
// Routes
app.use(router);
app.use((req,res,next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
   
  // Pass to next layer of middleware
  next();
});
app.use('/api', routerApi);





//Catch 404 and forward to error handler
// app.use((req, res, next) => {
//   const err: any = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
// // Handle error
// app.use((err, req, res, next) => {
//   res.status(err.status || 500);
//   res.redirect(`/error/${err.status || 500}`);
// });
export default app;