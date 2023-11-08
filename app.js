import express from 'express'
import handlebars from 'express-handlebars';
import { productsRouter } from './routes/products.router.js';
import { cartsRouter } from './routes/carts.router.js';
import __dirname from './utils.js';
import viewRouter from './routes/views.router.js';
import {Server} from 'socket.io';
import path from 'path';

const app =express();
const port =8080;

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use('/api/products',productsRouter);
app.use('/api/carts',cartsRouter) ;
const io = new Server(httpServer)

app.engine('handlebars', handlebars.engine());
app.set('views', `${__dirname}/views`);
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use('/', viewRouter);

let messages = [];
io.on('connection', (socket) => {
    console.log('Un cliente se ha conectado');
  
    socket.on('message', (data) => {
        messages.push(data);
        io.emit('messageLogs', messages)
    });

    socket.on("auth", (username) => {
        socket.emit("messageLogs", messages);
        socket.broadcast.emit("userConnected", username);
      });
});

app.listen(port, () => console.log(`Express server listening on port ${port}`));

function generateProductId(products) {
    let newId;
    do {
      newId = Math.floor(Math.random() * 1000); 
    } while (products.some(p => p.id == newId));
    return newId;
  }
  
  function generateCartId() {
    return Math.floor(Math.random() * 1000); 
  }

  