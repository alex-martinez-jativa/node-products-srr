import { createServer } from 'http';
import { parse } from 'url';

import Router from './router/router.js';

import getProductsController from './controllers/getProductsController.js';

const router = new Router();

router.get('/', getProductsController);

const server = createServer(async (req, res) => {
  const path = parse(req.url).pathname;
  const handler = router.resolve(req.method, path);

  if (handler && typeof handler === 'function') {
    handler(req, res);

  } else {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.end('404 Not Found');
  }
});

const PORT = process.env.PORT || 8000;

server.listen(PORT, () => {
    console.log(`Server on port ${PORT}`);
});