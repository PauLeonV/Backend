import express from 'express';
import { Server } from 'socket.io';
import { uploader } from '../utils.js';

import io from '../app.js';


const viewRouter = express.Router();

viewRouter.get('/', (req, res) => {
  const productsFile = './productos.json';
  
  const products = productsFile.getProductFromFile();
  
  res.render("index", {
    layout: 'home',
    products
  });
});

viewRouter.get("/realtimeproducts", (req, res) => {
  const productsFile = './productos.json';
  
  const products = productsFile.getProductFromFile();
  res.render('index', {
    layout: 'realTimeProducts',
    products
  });
});

export default viewRouter;