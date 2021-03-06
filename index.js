const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const routes = require('./config/routes');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const auth = require('./lib/auth');
const flash = require('express-flash');
const marked = require('marked');

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function(code) {
    return require('highlight.js').highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

const {dbURI, port } = require('./config/environment');

mongoose.connect(dbURI);
app.use(ejsLayouts);

app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

app.use(session({
  secret: 'shhh',
  resave: false,
  saveUninitialized: false
}));

app.use(express.static(`${__dirname}/public`));


console.log(marked('I am using __markdown__.'));
app.use(flash());

app.use(auth);

app.use(routes);



app.listen(port, () => console.log(`Express is running on port ${port}`));
