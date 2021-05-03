const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const path = require('path');
const exphbs = require('express-handlebars');

require("dotenv").config();

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge:1000*60*60*2
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public/')));
app.engine('handlebars', exphbs({defaultLayout: "main"}));
app.set('view engine', 'handlebars');


app.use(routes);

<<<<<<< HEAD
=======


>>>>>>> 762987d3b3ac5cfc7678d658799a46c196933435

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});
