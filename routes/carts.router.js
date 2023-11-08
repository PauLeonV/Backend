import express from 'express';
import fs from 'fs';
const cartsRouter = express.Router();
const cartsFile = './carrito.json';

cartsRouter.post('/', (req, res) => {
    const newCart = {
      id: generateCartId(),
      products: [],
    };
    fs.readFile(cartsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading carts file');
      } else {
        const carts = JSON.parse(data);
        carts.push(newCart);
        fs.writeFile(cartsFile, JSON.stringify(carts), (err) => {
          if (err) {
            res.status(500).send('Error writing carts file');
          } else {
            res.json(newCart);
          }
        });
      }
    });
  });
  
  
  cartsRouter.get('/:cid', (req, res) => {
    const cartId = req.params.cid;
    fs.readFile(cartsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading carts file');
      } else {
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id == cartId);
        if (cart) {
          res.json(cart.products);
        } else {
          res.status(404).send('Cart not found');
        }
      }
    });
  });
  
  
  cartsRouter.post('/:cid/product/:pid', (req, res) => {
    const cartId = req.params.cid;
    const productId = req.params.pid;
    const quantity = req.body.quantity || 1;
  
    fs.readFile(cartsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading carts file');
      } else {
        const carts = JSON.parse(data);
        const cart = carts.find(c => c.id == cartId);
        if (cart) {
          fs.readFile(productsFile, 'utf8', (err, productData) => {
            if (err) {
              res.status(500).send('Error reading products file');
            } else {
              const products = JSON.parse(productData);
              const product = products.find(p => p.id == productId);
              if (product) {
                const existingProduct = cart.products.find(p => p.id == productId);
                if (existingProduct) {
                  existingProduct.quantity += quantity;
                } else {
                  cart.products.push({ id: productId, quantity });
                }
                fs.writeFile(cartsFile, JSON.stringify(carts), (err) => {
                  if (err) {
                    res.status(500).send('Error writing carts file');
                  } else {
                    res.json(cart);
                  }
                });
              } else {
                res.status(404).send('Product not found');
              }
            }
          });
        } else {
          res.status(404).send('Cart not found');
        }
      }
    });
  });

export { cartsRouter };