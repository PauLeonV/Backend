import express from 'express';
import fs from 'fs';
const productsRouter = express.Router();
const productsFile = './productos.json';

productsRouter.get('/', (req, res) => {
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        const products = JSON.parse(data);
        const limit = req.query.limit || products.length;
        res.json(products.slice(0, limit));
      }
    });
  });
  productsRouter.get('/:pid', (req, res) => {
    const productId = req.params.pid;
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        const products = JSON.parse(data);
        const product = products.find(p => p.id == productId);
        if (product) {
          res.json(product);
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });
  

  productsRouter.post('/', (req, res) => {
    const newProduct = req.body;
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        const products = JSON.parse(data);
        newProduct.id = generateProductId(products);
        products.push(newProduct);
        fs.writeFile(productsFile, JSON.stringify(products), (err) => {
          if (err) {
            res.status(500).send('Error writing products file');
          } else {
            res.json(newProduct);
          }
        });
      }
    });
  });
  

  productsRouter.put('/:pid', (req, res) => {
    const productId = req.params.pid;
    const updatedProduct = req.body;
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        const products = JSON.parse(data);
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
          products[index] = { ...products[index], ...updatedProduct };
          fs.writeFile(productsFile, JSON.stringify(products), (err) => {
            if (err) {
              res.status(500).send('Error writing products file');
            } else {
              res.json(products[index]);
            }
          });
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });
  
  
  productsRouter.delete('/:pid', (req, res) => {
    const productId = req.params.pid;
    fs.readFile(productsFile, 'utf8', (err, data) => {
      if (err) {
        res.status(500).send('Error reading products file');
      } else {
        let products = JSON.parse(data);
        const index = products.findIndex(p => p.id == productId);
        if (index !== -1) {
          products = products.filter(p => p.id != productId);
          fs.writeFile(productsFile, JSON.stringify(products), (err) => {
            if (err) {
              res.status(500).send('Error writing products file');
            } else {
              res.json({ message: 'Product deleted' });
            }
          });
        } else {
          res.status(404).send('Product not found');
        }
      }
    });
  });

export { productsRouter };