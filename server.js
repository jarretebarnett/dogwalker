const path = require('path');
const http = require('http');
const express = require('express');
const socketio = require('socket.io'); 
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');
const formatMessage = require('./utils/messages');
const {
  ownerJoin,
  getCurrentOwner,
  ownerLeave,
  getRoomOwners
} = require('./utils/owners');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
const io = socketio(server);

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
};
  
app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

const doggieBot = 'Doggie Bot';

io.on('connection', socket => {
  console.log("New WS connection ...");

  socket.on('joinRoom', ({ name, room }) => {
    const owner = ownerJoin(socket.id, name, room);

    socket.join(owner.room);

    socket.emit('message', formatMessage(doggieBot, 'Welcome to chat!'));

    socket.broadcast.to(owner.room).emit('message', formatMessage(doggieBot, `${owner.name} has entered the chat!`));

    io.to(owner.room).emit('roomUsers'), {
      room: owner.room,
      owners: getRoomOwners(owner.room)
    }

    socket.on('chatMessage', msg => {
      const owner = getCurrentOwner(socket.id);
  
      io.to(owner.room).emit('message', formatMessage(owner.name, msg));
    });
  
    socket.on('disconnect', () => {
      const owner = ownerLeave(socket.id);
  
      if(owner) {
        io.to(owner.room).emit('message', formatMessage(doggieBot, `${owner.name} has left the chat!`));

        io.to(owner.room).emit('roomUsers'), {
          room: owner.room,
          owners: getRoomOwners(owner.room)
        }
      }
    });
  });
})

sequelize.sync({ force: true }).then(() => {
  server.listen(PORT, () => console.log('Now listening to PORT 3001'));
});